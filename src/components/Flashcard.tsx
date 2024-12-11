import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface FlashcardProps {
  front: string;
  back: string;
  onFlip?: (isFlipped: boolean) => void;
}

export const Flashcard = ({ front, back, onFlip }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    onFlip?.(newFlipped);
  };

  return (
    <div className="perspective-1000 w-full max-w-2xl mx-auto">
      <Card
        className={`p-8 cursor-pointer transition-all duration-500 transform bg-card hover:bg-accent
          ${isFlipped ? 'rotate-y-180' : ''} min-h-[200px] flex items-center justify-center relative group border`}
        onClick={handleFlip}
      >
        <div 
          className={`text-xl text-center text-card-foreground absolute inset-0 flex items-center justify-center p-6 backface-hidden transition-opacity duration-500
            ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
        >
          {front}
        </div>
        <div 
          className={`text-xl text-center text-card-foreground absolute inset-0 flex items-center justify-center p-6 backface-hidden transition-opacity duration-500 rotate-y-180
            ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
        >
          {back}
        </div>
        <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          Click to flip
        </div>
      </Card>
    </div>
  );
};