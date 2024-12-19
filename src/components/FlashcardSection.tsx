import { useState, useEffect } from "react";
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
import { StudyModeSelector } from "./StudyModeSelector";
import { calculateNextReview, isCardDue } from "../utils/srsSystem";

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
  const [studyMode, setStudyMode] = useState<'regular' | 'cram' | 'review' | 'scheduled'>('regular');
  const [streak, setStreak] = useState(0);
  const [reviewQueue, setReviewQueue] = useState<number[]>([]);

  useEffect(() => {
    // Initialize review queue based on study mode
    const initializeQueue = () => {
      switch (studyMode) {
        case 'review':
          // Only include due cards
          const dueCards = flashcards
            .map((_, index) => index)
            .filter(index => isCardDue(new Date())); // You'll need to store and check actual due dates
          setReviewQueue(dueCards);
          break;
        case 'cram':
          // Include all cards
          setReviewQueue([...Array(flashcards.length)].map((_, i) => i));
          break;
        default:
          // Regular mode - mix of new and due cards
          setReviewQueue([...Array(flashcards.length)].map((_, i) => i));
      }
    };

    initializeQueue();
  }, [studyMode, flashcards]);

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

  const handleDifficultyRating = (difficulty: 'easy' | 'medium' | 'hard', confidence: number) => {
    setRatings(prev => ({
      ...prev,
      [difficulty]: prev[difficulty] + 1
    }));

    // Update streak
    if (difficulty === 'easy' && confidence >= 4) {
      setStreak(prev => prev + 1);
      if ((streak + 1) % 5 === 0) {
        toast.success(`🔥 ${streak + 1} card streak! Keep it up!`);
      }
    } else {
      setStreak(0);
    }

    // Calculate next review time using SRS
    const { nextInterval, newEaseFactor } = calculateNextReview(
      confidence,
      1, // Current interval (you'll need to store this per card)
      2.5 // Current ease factor (you'll need to store this per card)
    );

    console.log(`Next review in ${nextInterval} days with ease factor ${newEaseFactor}`);
    toast.success(`Rated as ${difficulty} with confidence ${confidence}`);
    handleNextCard();
  };

  const handleStudyModeChange = (mode: 'regular' | 'cram' | 'review' | 'scheduled') => {
    setStudyMode(mode);
    toast.info(`Switched to ${mode} mode`);
  };

  return (
    <div className="space-y-6">
      <StudyModeSelector onSelectMode={handleStudyModeChange} />
      
      <StudyProgress 
        cardsReviewed={ratings.easy + ratings.medium + ratings.hard}
        totalCards={flashcards.length}
        startTime={startTime}
        ratings={ratings}
        streak={streak}
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
        onRateEasy={() => handleDifficultyRating('easy', 5)}
        onRateMedium={() => handleDifficultyRating('medium', 5)}
        onRateHard={() => handleDifficultyRating('hard', 5)}
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
