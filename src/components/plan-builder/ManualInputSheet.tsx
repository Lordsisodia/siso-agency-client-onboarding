
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ManualInputForm } from "./ManualInputForm";

interface ManualInputSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitToAI: (prompt: string, formData?: Record<string, any>) => Promise<void>;
}

export function ManualInputSheet({ isOpen, onClose, onSubmitToAI }: ManualInputSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-3xl p-0 bg-transparent border-none flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <ManualInputForm 
            onClose={onClose} 
            onSubmitToAI={onSubmitToAI} 
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
