import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Clock, Trophy, Target } from "lucide-react";
import { StudyTimeChart } from "@/components/analytics/StudyTimeChart";
import { SuccessRateChart } from "@/components/analytics/SuccessRateChart";
import { LearningPatterns } from "@/components/analytics/LearningPatterns";

const Analytics = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your study progress and learning patterns
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-medical-primary/10 rounded-lg">
              <Brain className="w-5 h-5 text-medical-primary" />
            </div>
            <h3 className="font-semibold">Cards Mastered</h3>
          </div>
          <Progress value={75} className="h-2 mb-2" />
          <p className="text-2xl font-bold">75%</p>
          <p className="text-sm text-muted-foreground">150 of 200 cards</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-medical-secondary/10 rounded-lg">
              <Clock className="w-5 h-5 text-medical-secondary" />
            </div>
            <h3 className="font-semibold">Study Time</h3>
          </div>
          <p className="text-2xl font-bold">12.5h</p>
          <p className="text-sm text-muted-foreground">This week</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-medical-accent/10 rounded-lg">
              <Trophy className="w-5 h-5 text-medical-accent" />
            </div>
            <h3 className="font-semibold">Current Streak</h3>
          </div>
          <p className="text-2xl font-bold">7 days</p>
          <p className="text-sm text-muted-foreground">Personal best: 14 days</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StudyTimeChart />
        <SuccessRateChart />
      </div>

      <LearningPatterns />
    </div>
  );
};

export default Analytics;