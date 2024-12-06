import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface FlashcardProps {
  front: string;
  back: string;
}

export const Flashcard = ({ front, back }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <Card
        className={`p-6 cursor-pointer transition-all duration-500 transform 
          ${isFlipped ? 'rotate-y-180' : ''} min-h-[200px] flex items-center justify-center`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`text-xl text-center ${isFlipped ? 'hidden' : ''}`}>
          {front}
        </div>
        <div className={`text-xl text-center ${isFlipped ? '' : 'hidden'}`}>
          {back}
        </div>
      </Card>
    </div>
  );
};