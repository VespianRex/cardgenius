
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { Brain, Zap, Target } from "lucide-react";
import { toast } from "sonner";
import debounce from "lodash/debounce";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PerformanceIndicatorProps {
  correctStreak: number;
  retention: number;
  maturityLevel: number;
  isLoading?: boolean;
}

class PerformanceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PerformanceError";
  }
}

export const PerformanceIndicator = ({ 
  correctStreak, 
  retention, 
  maturityLevel, 
  isLoading = false 
}: PerformanceIndicatorProps) => {
  // Validate and clamp values
  const safeRetention = Math.min(Math.max(0, Number(retention) || 0), 100);
  const safeStreak = Math.min(Math.max(0, Number(correctStreak) || 0), 10);
  const safeMaturity = Math.min(Math.max(0, Number(maturityLevel) || 0), 1);

  if (Number.isNaN(retention) || Number.isNaN(correctStreak) || Number.isNaN(maturityLevel)) {
    throw new PerformanceError("Invalid performance values provided");
  }

  const getMaturityColor = (level: number) => {
    if (level >= 0.8) return "text-green-500";
    if (level >= 0.5) return "text-yellow-500";
    return "text-red-500";
  };

  const showPerformanceTip = debounce(() => {
    if (safeRetention < 70) {
      toast.info("Try reviewing cards more frequently to improve retention", {
        id: "retention-tip",
      });
    } else if (safeStreak >= 5) {
      toast.success("Great streak! Keep up the good work! 🎯", {
        id: "streak-tip",
      });
    }
  }, 1000);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4 p-4 bg-card rounded-lg shadow-sm animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col items-center justify-center">
            <div className="relative w-16 h-16 bg-muted rounded-full" />
            <div className="mt-2 h-4 w-16 bg-muted rounded" />
            <div className="mt-1 h-3 w-8 bg-muted rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-3 gap-4 p-4 bg-card rounded-lg shadow-sm"
      role="region"
      aria-label="Performance Indicators"
    >
      <TooltipProvider>
        <div className="flex flex-col items-center justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative w-16 h-16">
                <AnimatedCircularProgressBar
                  max={100}
                  min={0}
                  value={safeRetention}
                  gaugePrimaryColor="hsl(var(--primary))"
                  gaugeSecondaryColor="hsl(var(--primary) / 0.2)"
                  className="w-16 h-16"
                />
                <Brain 
                  className="absolute inset-0 m-auto w-6 h-6 text-primary"
                  aria-hidden="true"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your retention rate shows how well you remember cards over time</p>
            </TooltipContent>
          </Tooltip>
          <span className="mt-2 text-sm font-medium">Retention</span>
          <span className="text-xs text-muted-foreground">{safeRetention.toFixed(1)}%</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative w-16 h-16">
                <AnimatedCircularProgressBar
                  max={100}
                  min={0}
                  value={safeStreak * 10}
                  gaugePrimaryColor="hsl(var(--primary))"
                  gaugeSecondaryColor="hsl(var(--primary) / 0.2)"
                  className="w-16 h-16"
                />
                <Zap 
                  className="absolute inset-0 m-auto w-6 h-6 text-primary"
                  aria-hidden="true"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Current streak of correct answers</p>
            </TooltipContent>
          </Tooltip>
          <span className="mt-2 text-sm font-medium">Streak</span>
          <span className="text-xs text-muted-foreground">{safeStreak}</span>
        </div>

        <div 
          className="flex flex-col items-center justify-center" 
          onClick={showPerformanceTip}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && showPerformanceTip()}
          aria-label="Show performance tip"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative w-16 h-16">
                <AnimatedCircularProgressBar
                  max={100}
                  min={0}
                  value={safeMaturity * 100}
                  gaugePrimaryColor="hsl(var(--primary))"
                  gaugeSecondaryColor="hsl(var(--primary) / 0.2)"
                  className="w-16 h-16"
                />
                <Target 
                  className={`absolute inset-0 m-auto w-6 h-6 ${getMaturityColor(safeMaturity)}`}
                  aria-hidden="true"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Card maturity level indicates how well established the card is in your memory</p>
            </TooltipContent>
          </Tooltip>
          <span className="mt-2 text-sm font-medium">Maturity</span>
          <span className="text-xs text-muted-foreground">{(safeMaturity * 100).toFixed(0)}%</span>
        </div>
      </TooltipProvider>
    </div>
  );
};
