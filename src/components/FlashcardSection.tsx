
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Flashcard {
  front: string;
  back: string;
}

interface FlashcardSectionProps {
  flashcards: Flashcard[];
}

export const FlashcardSection = ({ flashcards }: FlashcardSectionProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev === flashcards.length - 1 ? 0 : prev + 1));
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  if (!flashcards.length) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No flashcards available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Card {currentCardIndex + 1} of {flashcards.length}</span>
      </div>

      <Card
        className="relative h-64 transition-all duration-500 transform-gpu cursor-pointer"
        onClick={handleFlip}
      >
        <div className="absolute inset-0 p-6 flex items-center justify-center">
          <div className={`transition-opacity duration-500 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
            <h3 className="text-xl font-semibold text-center">{flashcards[currentCardIndex].front}</h3>
          </div>
          <div className={`transition-opacity duration-500 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-center">{flashcards[currentCardIndex].back}</p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" onClick={handleNext}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
