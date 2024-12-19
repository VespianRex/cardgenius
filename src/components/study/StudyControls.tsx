import { Button } from "../ui/button";
import { DifficultyRating } from "../DifficultyRating";
import { NavigationControls } from "../NavigationControls";
import { KeyboardShortcuts } from "../KeyboardShortcuts";
import { Keyboard } from "lucide-react";

interface StudyControlsProps {
  currentCardIndex: number;
  totalCards: number;
  showRating: boolean;
  showKeyboardShortcuts: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onDifficultyRate: (difficulty: 'easy' | 'medium' | 'hard', confidence: number) => void;
  onToggleKeyboardShortcuts: () => void;
}

export const StudyControls = ({
  currentCardIndex,
  totalCards,
  showRating,
  showKeyboardShortcuts,
  onPrevious,
  onNext,
  onDifficultyRate,
  onToggleKeyboardShortcuts
}: StudyControlsProps) => {
  return (
    <div className="space-y-6">
      <DifficultyRating 
        onRate={onDifficultyRate}
        visible={showRating}
      />

      <NavigationControls 
        currentCardIndex={currentCardIndex}
        totalCards={totalCards}
        onPrevious={onPrevious}
        onNext={onNext}
        onToggleKeyboardShortcuts={onToggleKeyboardShortcuts}
      />

      <KeyboardShortcuts 
        isVisible={showKeyboardShortcuts}
        onToggle={onToggleKeyboardShortcuts}
      />

      <div className="text-center text-sm text-muted-foreground">
        Card {currentCardIndex + 1} of {totalCards}
        <Button
          variant="ghost"
          size="sm"
          className="ml-2 text-medical-primary/60 hover:text-medical-primary"
          onClick={onToggleKeyboardShortcuts}
        >
          <Keyboard className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};