import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Settings, 
  Pause,
  Play 
} from "lucide-react";
import { toast } from "sonner";

interface StudyControlsProps {
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  isPaused?: boolean;
  onPauseToggle?: () => void;
  showPauseButton?: boolean;
}

export const StudyControls = ({
  onNext,
  onPrevious,
  onReset,
  isPaused = false,
  onPauseToggle,
  showPauseButton = false,
}: StudyControlsProps) => {
  const handleReset = () => {
    onReset();
    toast.info("Study session reset");
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-card rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevious}
          className="hover:bg-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          className="hover:bg-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {showPauseButton && onPauseToggle && (
          <Button
            variant="outline"
            size="icon"
            onClick={onPauseToggle}
            className="hover:bg-accent"
          >
            {isPaused ? (
              <Play className="h-4 w-4" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={handleReset}
          className="hover:bg-accent"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="hover:bg-accent"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};