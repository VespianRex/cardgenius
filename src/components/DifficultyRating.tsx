import { Button } from "./ui/button";
import { StarIcon } from "lucide-react";

interface DifficultyRatingProps {
  onRate: (difficulty: 'easy' | 'medium' | 'hard', confidence: number) => void;
  visible: boolean;
}

export const DifficultyRating = ({ onRate, visible }: DifficultyRatingProps) => {
  if (!visible) return null;

  const handleRate = (difficulty: 'easy' | 'medium' | 'hard', confidence: number) => {
    onRate(difficulty, confidence);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-center gap-4">
        {[
          { type: 'easy', label: 'Easy', color: 'bg-green-600 hover:bg-green-700', key: 'E' },
          { type: 'medium', label: 'Medium', color: 'bg-yellow-600 hover:bg-yellow-700', key: 'M' },
          { type: 'hard', label: 'Hard', color: 'bg-red-600 hover:bg-red-700', key: 'H' },
        ].map(({ type, label, color, key }) => (
          <Button
            key={type}
            onClick={() => handleRate(type as 'easy' | 'medium' | 'hard', 5)}
            className={`${color} text-white px-6 transition-all duration-300 hover:scale-105 relative group`}
          >
            {label}
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              Press '{key}'
            </span>
          </Button>
        ))}
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">Rate your confidence (1-5)</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              variant="outline"
              size="sm"
              onClick={() => handleRate('medium', rating)}
              className="relative group"
            >
              <StarIcon className={`w-4 h-4 ${rating <= 3 ? 'text-yellow-500' : 'text-green-500'}`} />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {rating}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};