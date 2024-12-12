import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationControlsProps {
  currentCardIndex: number;
  totalCards: number;
  onPrevious: () => void;
  onNext: () => void;
  onToggleKeyboardShortcuts: () => void;
}

export const NavigationControls = ({
  currentCardIndex,
  totalCards,
  onPrevious,
  onNext,
  onToggleKeyboardShortcuts,
}: NavigationControlsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        <Button 
          variant="outline"
          onClick={onPrevious}
          disabled={currentCardIndex === 0}
          className="rounded-full border-medical-accent/20 hover:bg-medical-accent/10 hover:border-medical-accent/40 gap-2 transition-all duration-300 hover:scale-105 relative group"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            ←
          </span>
        </Button>
        <Button 
          onClick={onNext}
          disabled={currentCardIndex === totalCards - 1}
          className="rounded-full bg-medical-secondary hover:bg-medical-secondary/90 gap-2 transition-all duration-300 hover:scale-105 relative group"
        >
          Next
          <ChevronRight className="w-4 h-4" />
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </span>
        </Button>
      </div>
    </div>
  );
};