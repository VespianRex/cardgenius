import { useState, useEffect } from "react";
import { Flashcard } from "./Flashcard";
import { toast } from "sonner";
import { QuickActions } from "./QuickActions";
import { KeyboardManager } from "./KeyboardManager";
import { StudyHeader } from "./study/StudyHeader";
import { StudyControls } from "./study/StudyControls";
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
  const [studyMode, setStudyMode] = useState<'regular' | 'cram' | 'review' | 'scheduled'>('regular');
  const [streak, setStreak] = useState(0);
  const [reviewQueue, setReviewQueue] = useState<number[]>([]);

  useEffect(() => {
    const initializeQueue = () => {
      switch (studyMode) {
        case 'review':
          const dueCards = flashcards
            .map((_, index) => index)
            .filter(index => isCardDue(new Date()));
          setReviewQueue(dueCards);
          break;
        case 'cram':
          setReviewQueue([...Array(flashcards.length)].map((_, i) => i));
          break;
        default:
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

    if (difficulty === 'easy' && confidence >= 4) {
      setStreak(prev => prev + 1);
      if ((streak + 1) % 5 === 0) {
        toast.success(`🔥 ${streak + 1} card streak! Keep it up!`);
      }
    } else {
      setStreak(0);
    }

    const { nextInterval, newEaseFactor } = calculateNextReview(
      confidence,
      1,
      2.5
    );

    console.log(`Next review in ${nextInterval} days with ease factor ${newEaseFactor}`);
    handleNextCard();
  };

  const handleStudyModeChange = (mode: 'regular' | 'cram' | 'review' | 'scheduled') => {
    setStudyMode(mode);
    toast.info(`Switched to ${mode} mode`);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <StudyHeader 
        currentCardIndex={currentCardIndex}
        totalCards={flashcards.length}
        startTime={startTime}
        ratings={ratings}
        streak={streak}
        onStudyModeChange={handleStudyModeChange}
      />

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

      <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <Flashcard
          front={flashcards[currentCardIndex].front}
          back={flashcards[currentCardIndex].back}
          onFlip={handleCardFlip}
        />
      </div>
      
      <StudyControls 
        currentCardIndex={currentCardIndex}
        totalCards={flashcards.length}
        showRating={showRating}
        showKeyboardShortcuts={showKeyboardShortcuts}
        onPrevious={handlePrevCard}
        onNext={handleNextCard}
        onDifficultyRate={handleDifficultyRating}
        onToggleKeyboardShortcuts={() => setShowKeyboardShortcuts(prev => !prev)}
      />

      <QuickActions />
    </div>
  );
};