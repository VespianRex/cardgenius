import { Button } from "./ui/button";

interface DifficultyRatingProps {
  onRate: (difficulty: 'easy' | 'medium' | 'hard') => void;
  visible: boolean;
}

export const DifficultyRating = ({ onRate, visible }: DifficultyRatingProps) => {
  if (!visible) return null;

  return (
    <div className="flex justify-center gap-4 animate-fade-in">
      {[
        { type: 'easy', label: 'Easy', color: 'bg-green-600 hover:bg-green-700', key: 'E' },
        { type: 'medium', label: 'Medium', color: 'bg-yellow-600 hover:bg-yellow-700', key: 'M' },
        { type: 'hard', label: 'Hard', color: 'bg-red-600 hover:bg-red-700', key: 'H' },
      ].map(({ type, label, color, key }) => (
        <Button
          key={type}
          onClick={() => onRate(type as 'easy' | 'medium' | 'hard')}
          className={`${color} text-white px-6 transition-all duration-300 hover:scale-105 relative group`}
        >
          {label}
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            Press '{key}'
          </span>
        </Button>
      ))}
    </div>
  );
};