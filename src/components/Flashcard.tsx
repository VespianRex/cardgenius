import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Rotate3D, ArrowLeftRight } from 'lucide-react';
import { GooeyText } from '@/components/ui/gooey-text-morphing';

interface FlashcardProps {
  front: string;
  back: string;
  onFlip?: (isFlipped: boolean) => void;
}

export const Flashcard = ({ front, back, onFlip }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip?.(!isFlipped);
  };

  return (
    <div
      className="perspective-1000 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`relative p-8 cursor-pointer transition-all duration-500 transform 
          ${isFlipped ? 'rotate-y-180' : ''} 
          h-[300px] group border border-medical-accent/20
          hover:border-medical-accent/40 hover:shadow-lg
          bg-gradient-to-br from-white to-medical-accent/5
          dark:from-gray-900 dark:to-medical-primary/10`}
        onClick={handleFlip}
        role="button"
        aria-label={`Flashcard. ${isFlipped ? 'Click to see front' : 'Click to see back'}`}
      >
        {/* Front of card */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-8 backface-hidden
            transition-opacity duration-500 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-lg text-card-foreground font-medium break-words line-clamp-6 overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent">
              {front}
            </p>
          </div>
          <div className={`absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 
            text-sm text-medical-primary/60 transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Rotate3D className="w-4 h-4" />
            <span>Click to flip</span>
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Back of card */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-8 backface-hidden 
            rotate-y-180 transition-opacity duration-500 
            ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-lg text-card-foreground line-clamp-6 overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent">
              <GooeyText
                texts={[back]}
                className="text-lg text-card-foreground"
              />
            </div>
          </div>
          <div className={`absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 
            text-sm text-medical-primary/60 transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Rotate3D className="w-4 h-4" />
            <span>Click to flip</span>
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>
      </Card>
    </div>
  );
};