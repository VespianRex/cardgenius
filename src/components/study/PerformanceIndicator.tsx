
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { Brain, Zap, Target } from "lucide-react";
import { toast } from "sonner";

interface PerformanceIndicatorProps {
  correctStreak: number;
  retention: number;
  maturityLevel: number;
}

export const PerformanceIndicator = ({ correctStreak, retention, maturityLevel }: PerformanceIndicatorProps) => {
  const getMaturityColor = (level: number) => {
    if (level >= 0.8) return "text-green-500";
    if (level >= 0.5) return "text-yellow-500";
    return "text-red-500";
  };

  const showPerformanceTip = () => {
    if (retention < 70) {
      toast.info("Try reviewing cards more frequently to improve retention");
    } else if (correctStreak >= 5) {
      toast.success("Great streak! Keep up the good work! 🎯");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-card rounded-lg shadow-sm">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-16 h-16">
          <AnimatedCircularProgressBar
            max={100}
            min={0}
            value={retention}
            gaugePrimaryColor="hsl(var(--primary))"
            gaugeSecondaryColor="hsl(var(--primary) / 0.2)"
            className="w-16 h-16"
          />
          <Brain className="absolute inset-0 m-auto w-6 h-6 text-primary" />
        </div>
        <span className="mt-2 text-sm font-medium">Retention</span>
        <span className="text-xs text-muted-foreground">{retention.toFixed(1)}%</span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative w-16 h-16">
          <AnimatedCircularProgressBar
            max={100}
            min={0}
            value={correctStreak * 10}
            gaugePrimaryColor="hsl(var(--primary))"
            gaugeSecondaryColor="hsl(var(--primary) / 0.2)"
            className="w-16 h-16"
          />
          <Zap className="absolute inset-0 m-auto w-6 h-6 text-primary" />
        </div>
        <span className="mt-2 text-sm font-medium">Streak</span>
        <span className="text-xs text-muted-foreground">{correctStreak}</span>
      </div>

      <div className="flex flex-col items-center justify-center" onClick={showPerformanceTip}>
        <div className="relative w-16 h-16">
          <AnimatedCircularProgressBar
            max={100}
            min={0}
            value={maturityLevel * 100}
            gaugePrimaryColor="hsl(var(--primary))"
            gaugeSecondaryColor="hsl(var(--primary) / 0.2)"
            className="w-16 h-16"
          />
          <Target className={`absolute inset-0 m-auto w-6 h-6 ${getMaturityColor(maturityLevel)}`} />
        </div>
        <span className="mt-2 text-sm font-medium">Maturity</span>
        <span className="text-xs text-muted-foreground">{(maturityLevel * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
};
