import { useState } from "react";
import { Flashcard } from "./Flashcard";
import { Keyboard } from "lucide-react";
import { toast } from "sonner";
import { StudyProgress } from "./StudyProgress";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { KeyboardShortcuts } from "./KeyboardShortcuts";
import { NavigationControls } from "./NavigationControls";
import { DifficultyRating } from "./DifficultyRating";
import { QuickActions } from "./QuickActions";
import { StudyTimer } from "./StudyTimer";
import { KeyboardManager } from "./KeyboardManager";

interface FlashcardSectionProps {
  flashcards: Array<{ front: string; back: string }>;
}

export const FlashcardSection = ({ flashcards }: FlashcardSectionProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [startTime] = useState(new Date());
  const [ratings, setRatings] = useState({ easy: 0, medium: 0, hard: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCardIndex(prev => prev + 1);
        setShowRating(false);
        setIsAnimating(false);
      }, 300);
      toast.info(`Card ${currentCardIndex + 2} of ${flashcards.length}`);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCardIndex(prev => prev - 1);
        setShowRating(false);
        setIsAnimating(false);
      }, 300);
      toast.info(`Card ${currentCardIndex} of ${flashcards.length}`);
    }
  };

  const handleCardFlip = (isFlipped: boolean) => {
    if (isFlipped) {
      setShowRating(true);
    }
  };

  const handleDifficultyRating = (difficulty: 'easy' | 'medium' | 'hard') => {
    setRatings(prev => ({
      ...prev,
      [difficulty]: prev[difficulty] + 1
    }));
    toast.success(`Rated as ${difficulty}`);
    handleNextCard();
  };

  return (
    <div className="space-y-6">
      <StudyProgress 
        cardsReviewed={ratings.easy + ratings.medium + ratings.hard}
        totalCards={flashcards.length}
        startTime={startTime}
        ratings={ratings}
      />

      <div className="flex items-center justify-between mb-6">
        <Progress 
          value={((currentCardIndex + 1) / flashcards.length) * 100} 
          className="h-2 flex-1 mr-4"
        />
        <StudyTimer 
          onBreakStart={() => setIsBreakTime(true)}
          onBreakEnd={() => setIsBreakTime(false)}
        />
      </div>

      <KeyboardManager 
        onNavigateLeft={handlePrevCard}
        onNavigateRight={handleNextCard}
        onFlipCard={() => {
          const cardElement = document.querySelector('.flashcard') as HTMLElement;
          if (cardElement) cardElement.click();
        }}
        onRateEasy={() => handleDifficultyRating('easy')}
        onRateMedium={() => handleDifficultyRating('medium')}
        onRateHard={() => handleDifficultyRating('hard')}
        onToggleShortcuts={() => setShowKeyboardShortcuts(prev => !prev)}
        showRating={showRating}
      />

      <KeyboardShortcuts 
        isVisible={showKeyboardShortcuts}
        onToggle={() => setShowKeyboardShortcuts(prev => !prev)}
      />

      <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <Flashcard
          front={flashcards[currentCardIndex].front}
          back={flashcards[currentCardIndex].back}
          onFlip={handleCardFlip}
        />
      </div>
      
      <DifficultyRating 
        onRate={handleDifficultyRating}
        visible={showRating}
      />

      <NavigationControls 
        currentCardIndex={currentCardIndex}
        totalCards={flashcards.length}
        onPrevious={handlePrevCard}
        onNext={handleNextCard}
        onToggleKeyboardShortcuts={() => setShowKeyboardShortcuts(prev => !prev)}
      />

      <div className="text-center text-sm text-muted-foreground">
        Card {currentCardIndex + 1} of {flashcards.length}
        <Button
          variant="ghost"
          size="sm"
          className="ml-2 text-medical-primary/60 hover:text-medical-primary"
          onClick={() => setShowKeyboardShortcuts(prev => !prev)}
        >
          <Keyboard className="w-4 h-4" />
        </Button>
      </div>

      <QuickActions />
    </div>
  );
};