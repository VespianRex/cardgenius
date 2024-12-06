import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface FlashcardProps {
  front: string;
  back: string;
}

export const Flashcard = ({ front, back }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full max-w-2xl mx-auto">
      <Card
        className={`p-8 cursor-pointer transition-all duration-500 transform bg-white/5 border-white/10 hover:bg-white/10
          ${isFlipped ? 'rotate-y-180' : ''} min-h-[200px] flex items-center justify-center`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`text-xl text-center text-white ${isFlipped ? 'hidden' : ''}`}>
          {front}
        </div>
        <div className={`text-xl text-center text-white ${isFlipped ? '' : 'hidden'}`}>
          {back}
        </div>
      </Card>
    </div>
  );
};