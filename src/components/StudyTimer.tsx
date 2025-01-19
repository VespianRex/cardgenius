import { useState, useEffect } from "react";
import { Timer, Battery, Sun } from "lucide-react";
import { toast } from "sonner";
import { getOptimalBatchSize, suggestBreakTime, analyzeStudyHabits } from "../utils/study/studyOptimizer";
import { Button } from "./ui/button";
import { Select } from "./ui/select";

interface StudyTimerProps {
  onBreakStart: () => void;
  onBreakEnd: () => void;
  onBatchSizeChange?: (size: number) => void;
}

export const StudyTimer = ({ onBreakStart, onBreakEnd, onBatchSizeChange }: StudyTimerProps) => {
  const [studyTime, setStudyTime] = useState(0);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [energyLevel, setEnergyLevel] = useState<'high' | 'medium' | 'low'>('medium');

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isBreakTime) {
        setStudyTime(prev => {
          const newTime = prev + 1;
          
          // Check for break time
          if (newTime % 1500 === 0) { // Every 25 minutes
            const shouldBreak = suggestBreakTime(Math.floor(newTime / 60));
            if (shouldBreak) {
              setIsBreakTime(true);
              onBreakStart();
              
              // Auto-resume after 5 minutes
              setTimeout(() => {
                setIsBreakTime(false);
                onBreakEnd();
                toast.success("Break time's over! Let's continue learning! 💪");
              }, 300000); // 5 minutes
            }
          }
          
          return newTime;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreakTime, onBreakStart, onBreakEnd]);

  // Update batch size based on current conditions
  useEffect(() => {
    const metrics = {
      timeOfDay: new Date().getHours(),
      energyLevel,
      consecutiveCards: 0,
      performance: []
    };

    const optimalBatchSize = getOptimalBatchSize(metrics);
    onBatchSizeChange?.(optimalBatchSize);

    // Suggest optimal study times
    if (studyTime === 0) {
      const hour = new Date().getHours();
      if (hour >= 23 || hour <= 5) {
        toast.info("Consider studying during daytime hours for better retention! 🌞");
      }
    }
  }, [energyLevel, onBatchSizeChange, studyTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Timer className="w-4 h-4" />
          {formatTime(studyTime)}
        </div>
        
        <div className="flex items-center gap-2">
          <Battery className="w-4 h-4 text-muted-foreground" />
          <Select
            value={energyLevel}
            onValueChange={(value: 'high' | 'medium' | 'low') => setEnergyLevel(value)}
          >
            <option value="high">High Energy</option>
            <option value="medium">Medium Energy</option>
            <option value="low">Low Energy</option>
          </Select>
        </div>
      </div>

      {isBreakTime && (
        <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <span className="text-sm">Break Time! Return in 5 minutes</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsBreakTime(false);
              onBreakEnd();
            }}
          >
            End Break Early
          </Button>
        </div>
      )}
    </div>
  );
};