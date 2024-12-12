import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Rotate3D, ArrowLeftRight } from 'lucide-react';

interface FlashcardProps {
  front: string;
  back: string;
  onFlip?: (isFlipped: boolean) => void;
}

export const Flashcard = ({ front, back, onFlip }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFlip = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    onFlip?.(newFlipped);
  };

  return (
    <div 
      className="perspective-1000 w-full max-w-2xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`relative p-8 cursor-pointer transition-all duration-500 transform 
          ${isFlipped ? 'rotate-y-180' : ''} 
          min-h-[250px] group border border-medical-accent/20
          hover:border-medical-accent/40 hover:shadow-lg
          bg-gradient-to-br from-white to-medical-accent/5
          dark:from-gray-900 dark:to-medical-primary/10`}
        onClick={handleFlip}
      >
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center p-8 backface-hidden
            transition-opacity duration-500 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="text-xl text-center text-card-foreground font-medium">
            {front}
          </div>
          <div className={`absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 
            text-sm text-medical-primary/60 transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <ArrowLeftRight className="w-4 h-4" />
            <span>Click to flip</span>
          </div>
        </div>
        
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center p-8 backface-hidden
            rotate-y-180 transition-opacity duration-500 
            ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-xl text-center text-card-foreground">
            {back}
          </div>
          <div className={`absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 
            text-sm text-medical-primary/60 transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Rotate3D className="w-4 h-4" />
            <span>Click to flip back</span>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <div className={`transition-transform duration-300 ${isHovered ? 'scale-100' : 'scale-0'}`}>
            <Rotate3D 
              className={`w-5 h-5 text-medical-primary/40 transition-transform duration-500
                ${isFlipped ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};