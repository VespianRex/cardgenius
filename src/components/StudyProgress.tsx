
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudyProgressProps {
  totalCards: number;
  cardsReviewed: number;
  ratings: {
    easy: number;
    medium: number;
    hard: number;
  };
  startTime: Date;
  streak: number;
}

export const StudyProgress = ({
  totalCards,
  cardsReviewed,
  ratings,
  startTime,
  streak
}: StudyProgressProps) => {
  // Calculate progress percentage
  const progressPercentage = Math.round((cardsReviewed / totalCards) * 100);
  
  // Calculate study time in minutes
  const studyTimeMinutes = Math.round(
    (new Date().getTime() - startTime.getTime()) / (1000 * 60)
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Study Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Cards Reviewed</p>
            <p className="text-lg font-medium">
              {cardsReviewed}/{totalCards}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Study Time</p>
            <p className="text-lg font-medium">{studyTimeMinutes} min</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
            <p className="text-xs text-muted-foreground">Easy</p>
            <p className="font-medium">{ratings.easy}</p>
          </div>
          <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
            <p className="text-xs text-muted-foreground">Medium</p>
            <p className="font-medium">{ratings.medium}</p>
          </div>
          <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
            <p className="text-xs text-muted-foreground">Hard</p>
            <p className="font-medium">{ratings.hard}</p>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm text-muted-foreground">Current Streak</p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium">{streak} days</p>
            <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
