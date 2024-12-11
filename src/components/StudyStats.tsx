import { Card } from "@/components/ui/card";
import { Clock, Brain, TrendingUp } from "lucide-react";

interface StudyStatsProps {
  cardsReviewed: number;
  totalCards: number;
  startTime: Date;
  ratings: { easy: number; medium: number; hard: number };
}

export const StudyStats = ({ cardsReviewed, totalCards, startTime, ratings }: StudyStatsProps) => {
  const calculateStudyTime = () => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - startTime.getTime()) / 60000);
    return `${diffInMinutes} min`;
  };

  const calculateAccuracy = () => {
    const total = ratings.easy + ratings.medium + ratings.hard;
    if (total === 0) return "0%";
    const score = ((ratings.easy * 1 + ratings.medium * 0.5) / total) * 100;
    return `${Math.round(score)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fade-in">
      <Card className="p-4 bg-white/5 border-white/10">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-medical-accent" />
          <div>
            <p className="text-sm text-gray-400">Study Time</p>
            <p className="text-xl font-semibold">{calculateStudyTime()}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-white/5 border-white/10">
        <div className="flex items-center gap-3">
          <Brain className="w-5 h-5 text-medical-accent" />
          <div>
            <p className="text-sm text-gray-400">Cards Reviewed</p>
            <p className="text-xl font-semibold">{cardsReviewed} / {totalCards}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-white/5 border-white/10">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-medical-accent" />
          <div>
            <p className="text-sm text-gray-400">Performance</p>
            <p className="text-xl font-semibold">{calculateAccuracy()}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};