import { Flashcard } from "../Flashcard";
import { KeyboardManager } from "../KeyboardManager";

interface FlashcardDisplayProps {
  card: { front: string; back: string };
  onFlip: (isFlipped: boolean) => void;
  showRating: boolean;
}

export const FlashcardDisplay = ({ card, onFlip, showRating }: FlashcardDisplayProps) => {
  return (
    <div className="relative">
      <KeyboardManager 
        onNavigateLeft={() => {}}
        onNavigateRight={() => {}}
        onFlipCard={() => {
          const cardElement = document.querySelector('.flashcard') as HTMLElement;
          if (cardElement) cardElement.click();
        }}
        onRateEasy={() => {}}
        onRateMedium={() => {}}
        onRateHard={() => {}}
        onToggleShortcuts={() => {}}
        showRating={showRating}
      />
      <Flashcard
        front={card.front}
        back={card.back}
        onFlip={onFlip}
      />
    </div>
  );
};