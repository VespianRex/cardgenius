import { useState, useEffect } from "react";
import { Flashcard } from "./Flashcard";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Keyboard } from "lucide-react";
import { toast } from "sonner";
import { StudyProgress } from "./StudyProgress";
import { Progress } from "./ui/progress";

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
    console.log(`Card ${currentCardIndex + 1} rated as ${difficulty}`);
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

      <div className="mb-6">
        <Progress value={((currentCardIndex + 1) / flashcards.length) * 100} className="h-2" />
      </div>

      {showKeyboardShortcuts && (
        <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-300 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Keyboard Shortcuts</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={() => setShowKeyboardShortcuts(false)}
            >
              <Keyboard className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>← / →: Navigate cards</div>
            <div>Space: Flip card</div>
            <div>E: Rate Easy</div>
            <div>M: Rate Medium</div>
            <div>H: Rate Hard</div>
            <div>K: Toggle shortcuts</div>
          </div>
        </div>
      )}

      <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <Flashcard
          front={flashcards[currentCardIndex].front}
          back={flashcards[currentCardIndex].back}
          onFlip={handleCardFlip}
        />
      </div>
      
      {showRating && (
        <div className="flex justify-center gap-4 animate-fade-in">
          <Button
            onClick={() => handleDifficultyRating('easy')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 transition-transform hover:scale-105 relative group"
          >
            Easy
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Press 'E'
            </span>
          </Button>
          <Button
            onClick={() => handleDifficultyRating('medium')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 transition-transform hover:scale-105 relative group"
          >
            Medium
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Press 'M'
            </span>
          </Button>
          <Button
            onClick={() => handleDifficultyRating('hard')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 transition-transform hover:scale-105 relative group"
          >
            Hard
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Press 'H'
            </span>
          </Button>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <Button 
          variant="outline"
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
          className="rounded-full border-white/10 hover:bg-white/10 hover:border-white/20 gap-2 transition-transform hover:scale-105 relative group"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
            ←
          </span>
        </Button>
        <Button 
          onClick={handleNextCard}
          disabled={currentCardIndex === flashcards.length - 1}
          className="rounded-full bg-medical-secondary hover:bg-medical-secondary/90 gap-2 transition-transform hover:scale-105 relative group"
        >
          Next
          <ChevronRight className="w-4 h-4" />
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </span>
        </Button>
      </div>
      <div className="text-center text-sm text-gray-400">
        Card {currentCardIndex + 1} of {flashcards.length}
        <Button
          variant="ghost"
          size="sm"
          className="ml-2 text-gray-400 hover:text-white"
          onClick={() => setShowKeyboardShortcuts(prev => !prev)}
        >
          <Keyboard className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
