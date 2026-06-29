import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SuggestWordForm from "./SuggestWordForm";

export default function SuggestWord({ context }: { context?: string }) {
  const [open, setOpen] = useState(false);

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
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
          <DialogTitle className="text-3xl font-martires-black uppercase tracking-wide text-left">
            SUGGEST A WORD
          </DialogTitle>
          <DialogDescription className="text-base text-foreground font-inter-regular text-left">
            Help grow the Bisaya word list
          </DialogDescription>
        </DialogHeader>

        <SuggestWordForm
          mode="dialog"
          onReset={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
