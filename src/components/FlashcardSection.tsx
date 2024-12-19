import { useState, useEffect } from "react";
import { Flashcard } from "./Flashcard";
import { Keyboard, Timer } from "lucide-react";
import { toast } from "sonner";
import { StudyProgress } from "./StudyProgress";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { KeyboardShortcuts } from "./KeyboardShortcuts";
import { NavigationControls } from "./NavigationControls";
import { DifficultyRating } from "./DifficultyRating";
import { QuickActions } from "./QuickActions";

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
  const [studyTime, setStudyTime] = useState(0);
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStudyTime(prev => prev + 1);
      
      // Suggest break every 25 minutes
      if (studyTime > 0 && studyTime % 1500 === 0 && !isBreakTime) {
        toast.info("Time for a 5-minute break! 🎯", {
          duration: 5000,
          action: {
            label: "Take Break",
            onClick: () => setIsBreakTime(true),
          },
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [studyTime]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'arrowleft':
          if (currentCardIndex > 0) handlePrevCard();
          break;
        case 'arrowright':
          if (currentCardIndex < flashcards.length - 1) handleNextCard();
          break;
        case ' ':
          event.preventDefault();
          const cardElement = document.querySelector('.flashcard') as HTMLElement;
          if (cardElement) cardElement.click();
          break;
        case 'e':
          if (showRating) handleDifficultyRating('easy');
          break;
        case 'm':
          if (showRating) handleDifficultyRating('medium');
          break;
        case 'h':
          if (showRating) handleDifficultyRating('hard');
          break;
        case 'k':
          setShowKeyboardShortcuts(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentCardIndex, flashcards.length, showRating]);

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Timer className="w-4 h-4" />
          {formatTime(studyTime)}
        </div>
      </div>

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