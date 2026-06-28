import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { MessageSquarePlus, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { toast } from "sonner";
import words from "../../../words.json";

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

export default function SuggestWord({ context }: { context?: string }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SuggestWordForm>({
    resolver: zodResolver(suggestWordSchema),
    defaultValues: { word: "" },
  });

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset form state when dialog closes
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
      // Check if this word was already suggested by anyone
      const suggestionsRef = collection(db, "word_suggestions");
      const q = query(suggestionsRef, where("word", "==", word));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        toast.error("This word has already been suggested!");
        setSubmitting(false);
        return;
      }

      // Check daily limit (5 per day)
      const userSuggestionsQuery = query(suggestionsRef, where("suggestedBy", "==", user.uid));
      const userSnapshot = await getDocs(userSuggestionsQuery);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let suggestionsToday = 0;
      userSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.suggestedAt) {
          // Firebase Timestamp to JS Date
          const suggestedDate = data.suggestedAt.toDate();
          if (suggestedDate >= today) {
            suggestionsToday++;
          }
        }
      });

      if (suggestionsToday >= 5) {
        toast.error("You've reached your daily limit of 5 suggestions! Come back tomorrow. 🙌");
        setSubmitting(false);
        return;
      }

      // Write the suggestion to Firestore
      await addDoc(suggestionsRef, {
        word,
        suggestedBy: user.uid,
        suggestedByEmail: user.email ?? "unknown",
        suggestedAt: serverTimestamp(),
        status: "pending",
      });

      setSubmitted(true);
      toast.success("Word suggested successfully! Salamat! 🙌");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to submit suggestion.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
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
          <DialogDescription className="text-xl font-martires-regular uppercase text-left">
            Help grow the Bisaya word list!
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          // Success state
          <div className="flex flex-col items-center gap-4 py-6">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <p className="font-inter-medium text-center text-lg">
              Your word has been submitted for review!
            </p>
            <p className="font-inter-regular text-muted-foreground text-center text-sm">
              Our team will review your suggestion and add it to the word list if it's a valid
              Bisaya word. Daghang salamat sa imong tabang!
            </p>
            <Button
              variant="outline"
              className="cursor-pointer mt-2 rounded-2xl"
              onClick={() => {
                reset();
                setSubmitted(false);
              }}
            >
              Suggest Another Word
            </Button>
          </div>
        ) : (
          // Form state
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="font-inter-regular text-sm text-muted-foreground">
                Know a 5-letter Bisaya word that's not in our list? Suggest it below and help
                fellow Bisaya speakers enjoy more words!
              </p>
              <div className="flex flex-col gap-1.5">
                <Input
                  {...register("word")}
                  placeholder="e.g. BABOY"
                  maxLength={5}
                  autoComplete="off"
                  autoCapitalize="characters"
                  className="text-center font-martires-black text-2xl uppercase tracking-[0.3em] h-14 rounded-xl"
                />
                {errors.word && (
                  <p className="text-destructive text-sm font-inter-medium">
                    {errors.word.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="cursor-pointer w-full py-6 text-base rounded-2xl"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
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
