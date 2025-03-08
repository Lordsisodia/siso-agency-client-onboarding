
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ManualInputForm } from "./ManualInputForm";

interface ManualInputSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitToAI: (prompt: string) => Promise<void>;
}

export function ManualInputSheet({ isOpen, onClose, onSubmitToAI }: ManualInputSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-3xl p-0 bg-transparent border-none">
        <ManualInputForm 
          onClose={onClose} 
          onSubmitToAI={onSubmitToAI} 
        />
      </SheetContent>
    </Sheet>
  );
}
