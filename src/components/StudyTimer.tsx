import { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import { toast } from "sonner";

interface StudyTimerProps {
  onBreakStart: () => void;
  onBreakEnd: () => void;
}

export const StudyTimer = ({ onBreakStart, onBreakEnd }: StudyTimerProps) => {
  const [studyTime, setStudyTime] = useState(0);
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStudyTime(prev => prev + 1);
      
      // Suggest break every 25 minutes
      if (studyTime > 0 && studyTime % 1500 === 0 && !isBreakTime) {
        toast.info("Time for a 5-minute break! 🎯", {
          duration: 5000,
          action: {
            label: "Take Break",
            onClick: () => {
              setIsBreakTime(true);
              onBreakStart();
            },
          },
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [studyTime, isBreakTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Timer className="w-4 h-4" />
      {formatTime(studyTime)}
    </div>
  );
};