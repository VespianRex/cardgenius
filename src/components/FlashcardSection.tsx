import { useState } from "react";
import { Flashcard } from "./Flashcard";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { StudyStats } from "./StudyStats";

interface FlashcardSectionProps {
  flashcards: Array<{ front: string; back: string }>;
}

export const FlashcardSection = ({ flashcards }: FlashcardSectionProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [startTime] = useState(new Date());
  const [ratings, setRatings] = useState({ easy: 0, medium: 0, hard: 0 });

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowRating(false);
      toast.info(`Card ${currentCardIndex + 2} of ${flashcards.length}`);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setShowRating(false);
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
    <div className="space-y-6 animate-fade-in">
      <StudyStats 
        cardsReviewed={ratings.easy + ratings.medium + ratings.hard}
        totalCards={flashcards.length}
        startTime={startTime}
        ratings={ratings}
      />

      <div className="bg-white/5 rounded-xl p-6">
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
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            Easy
          </Button>
          <Button
            onClick={() => handleDifficultyRating('medium')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6"
          >
            Medium
          </Button>
          <Button
            onClick={() => handleDifficultyRating('hard')}
            className="bg-red-600 hover:bg-red-700 text-white px-6"
          >
            Hard
          </Button>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <Button 
          variant="outline"
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
          className="rounded-full border-white/10 hover:bg-white/10 hover:border-white/20 gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button 
          onClick={handleNextCard}
          disabled={currentCardIndex === flashcards.length - 1}
          className="rounded-full bg-medical-secondary hover:bg-medical-secondary/90 gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="text-center text-sm text-gray-400">
        Card {currentCardIndex + 1} of {flashcards.length}
      </div>
    </div>
  );
};