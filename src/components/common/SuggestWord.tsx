import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { MessageSquarePlus, Loader2, CheckCircle2, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { toast } from "sonner";
import words from "../../../words.json";

const DAILY_LIMIT = 5;

const lowercasedWords = (words as string[]).map((w) => w.toLowerCase());

const suggestWordSchema = z.object({
  word: z
    .string()
    .transform((val) => val.toLowerCase().trim())
    .pipe(
      z
        .string()
        .min(5, "Must be exactly 5 letters")
        .max(5, "Must be exactly 5 letters")
        .regex(/^[a-z]+$/, "Letters only — no numbers or symbols")
    )
    .refine((val) => !lowercasedWords.includes(val), {
      message: "This word already exists in the word list!",
    }),
});

type SuggestWordForm = z.input<typeof suggestWordSchema>;

function getTimeUntilMidnight(): string {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const diffMs = midnight.getTime() - now.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export default function SuggestWord({ context }: { context?: string }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [usedToday, setUsedToday] = useState(0);
  const [loadingQuota, setLoadingQuota] = useState(false);
  const [timeUntilReset, setTimeUntilReset] = useState(getTimeUntilMidnight());

  const remaining = DAILY_LIMIT - usedToday;
  const isLimitReached = remaining <= 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SuggestWordForm>({
    resolver: zodResolver(suggestWordSchema),
    defaultValues: { word: "" },
  });

  // Tick the time-until-reset every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilReset(getTimeUntilMidnight());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Fetch today's usage count when the dialog opens
  useEffect(() => {
    if (!open) return;
    const user = auth.currentUser;
    if (!user) return;

    setLoadingQuota(true);
    const suggestionsRef = collection(db, "word_suggestions");
    const userQuery = query(suggestionsRef, where("suggestedBy", "==", user.uid));

    getDocs(userQuery).then((snapshot) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let count = 0;
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.suggestedAt && data.suggestedAt.toDate() >= today) {
          count++;
        }
      });
      setUsedToday(count);
      setLoadingQuota(false);
    });
  }, [open]);

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
      setSubmitted(false);
    }
  }

  async function onSubmit(data: SuggestWordForm) {
    const user = auth.currentUser;
    if (!user) {
      toast.error("You must be logged in to suggest a word.");
      return;
    }

    const word = data.word.toLowerCase().trim();
    setSubmitting(true);

    try {
      const suggestionsRef = collection(db, "word_suggestions");

      // Check if word already suggested by anyone
      const dupeQuery = query(suggestionsRef, where("word", "==", word));
      const dupeSnapshot = await getDocs(dupeQuery);
      if (!dupeSnapshot.empty) {
        toast.error("This word has already been suggested!");
        setSubmitting(false);
        return;
      }

      // Re-check daily limit server-side before writing
      const userQuery = query(suggestionsRef, where("suggestedBy", "==", user.uid));
      const userSnapshot = await getDocs(userQuery);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let suggestionsToday = 0;
      userSnapshot.forEach((doc) => {
        const d = doc.data();
        if (d.suggestedAt && d.suggestedAt.toDate() >= today) suggestionsToday++;
      });

      if (suggestionsToday >= DAILY_LIMIT) {
        setUsedToday(DAILY_LIMIT);
        toast.error("Daily limit reached! Come back tomorrow.");
        setSubmitting(false);
        return;
      }

      await addDoc(suggestionsRef, {
        word,
        suggestedBy: user.uid,
        suggestedByEmail: user.email ?? "unknown",
        suggestedAt: serverTimestamp(),
        status: "pending",
      });

      setUsedToday((prev) => prev + 1);
      setSubmitted(true);
      toast.success("Salamat! Word submitted for review. 🙌");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to submit suggestion.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  // Dot indicators for the quota bar
  function QuotaDots() {
    return (
      <div className="flex gap-1.5">
        {Array.from({ length: DAILY_LIMIT }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              i < usedToday
                ? usedToday >= DAILY_LIMIT
                  ? "bg-red-500"
                  : "bg-blue-500"
                : "bg-border"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {context === "header" ? (
        <DialogTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            <MessageSquarePlus className="scale-150 md:scale-180" />
          </Button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button
            size={"sm"}
            variant={"outline"}
            className="cursor-pointer w-full py-6 text-base rounded-2xl"
          >
            Suggest a Word
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-4xl font-martires-black uppercase tracking-wider text-left">
            SUGGEST A WORD
          </DialogTitle>
          <DialogDescription className="text-lg font-martires-regular uppercase text-left">
            Help grow the Bisaya word list!
          </DialogDescription>
        </DialogHeader>

        {/* Daily Quota Card */}
        <div className={`rounded-2xl p-4 border ${
          isLimitReached
            ? "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900"
            : "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900"
        }`}>
          {loadingQuota ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-inter-regular text-sm">Checking your quota...</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isLimitReached
                    ? <Clock className={`w-4 h-4 text-red-500`} />
                    : <Flame className={`w-4 h-4 text-blue-500`} />
                  }
                  <span className={`font-inter-semibold text-sm ${
                    isLimitReached ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"
                  }`}>
                    {isLimitReached
                      ? "Daily limit reached"
                      : `${remaining} suggestion${remaining !== 1 ? "s" : ""} left today`
                    }
                  </span>
                </div>
                <span className="font-inter-regular text-xs text-muted-foreground">
                  {usedToday}/{DAILY_LIMIT} used
                </span>
              </div>
              <QuotaDots />
              {isLimitReached && (
                <p className="font-inter-regular text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  Resets in {timeUntilReset}
                </p>
              )}
            </div>
          )}
        </div>

        {submitted ? (
          // Success state
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-green-500" />
            </div>
            <div className="flex flex-col gap-1 text-center">
              <p className="font-inter-semibold text-lg">
                Word submitted!
              </p>
              <p className="font-inter-regular text-muted-foreground text-sm">
                Our team will review your suggestion and add it to the word list if it's a valid Bisaya word. Daghang salamat sa imong tabang!
              </p>
            </div>
            {!isLimitReached && (
              <Button
                variant="outline"
                className="cursor-pointer mt-1 rounded-2xl"
                onClick={() => {
                  reset();
                  setSubmitted(false);
                }}
              >
                Suggest Another Word
              </Button>
            )}
          </div>
        ) : (
          // Form state
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <p className="font-inter-regular text-sm text-muted-foreground">
              Know a 5-letter Bisaya word that's not in our list? Type it below!
            </p>

            <div className="flex flex-col gap-1.5">
              <Input
                {...register("word")}
                placeholder="e.g. BABOY"
                maxLength={5}
                autoComplete="off"
                autoCapitalize="characters"
                disabled={isLimitReached}
                className={`text-center font-martires-black text-2xl uppercase tracking-[0.3em] h-14 rounded-xl transition-colors ${
                  isLimitReached
                    ? "opacity-50 cursor-not-allowed"
                    : "border-blue-300 focus-visible:ring-blue-400 dark:border-blue-700"
                }`}
              />
              {errors.word && (
                <p className="text-destructive text-sm font-inter-medium">
                  {errors.word.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting || isLimitReached || loadingQuota}
              className={`cursor-pointer w-full py-6 text-base rounded-2xl transition-all ${
                isLimitReached
                  ? "opacity-60 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-500"
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : isLimitReached ? (
                <>
                  <Clock className="w-4 h-4 mr-2" />
                  Come back in {timeUntilReset}
                </>
              ) : (
                "Submit Suggestion"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
