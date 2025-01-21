import { Progress } from "@/components/ui/progress";
import { Target, Trophy, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StudyGoalsProps {
  dailyGoal: number;
  currentProgress: number;
  streakDays: number;
  studyTime: number;
}

export const StudyGoals = ({
  dailyGoal,
  currentProgress,
  streakDays,
  studyTime,
}: StudyGoalsProps) => {
  const progressPercentage = (currentProgress / dailyGoal) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Daily Goal</h3>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <p className="text-sm text-muted-foreground">
          {currentProgress} / {dailyGoal} cards
        </p>
      </Card>

      <Card className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Study Streak</h3>
        </div>
        <p className="text-2xl font-bold">{streakDays}</p>
        <p className="text-sm text-muted-foreground">days in a row</p>
      </Card>

      <Card className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Study Time</h3>
        </div>
        <p className="text-2xl font-bold">{Math.floor(studyTime / 60)}:{(studyTime % 60).toString().padStart(2, '0')}</p>
        <p className="text-sm text-muted-foreground">total time today</p>
      </Card>
    </div>
  );
};