import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Clock, Trophy } from 'lucide-react';
import { toast } from 'sonner';

interface StudyProgressProps {
  totalCards: number;
  cardsReviewed: number;
  ratings: {
    easy: number;
    medium: number;
    hard: number;
  };
  startTime: Date;
}

export const StudyProgress = ({ totalCards, cardsReviewed, ratings, startTime }: StudyProgressProps) => {
  const [studyDuration, setStudyDuration] = useState('0:00');
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setStudyDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    if (ratings.easy > 0 && ratings.easy % 5 === 0) {
      setStreakCount(prev => prev + 1);
      toast.success('Great streak! Keep going! 🎯');
    }
  }, [ratings.easy]);

  const progressPercentage = (cardsReviewed / totalCards) * 100;
  const masteryScore = ((ratings.easy * 3 + ratings.medium * 2 + ratings.hard) / (cardsReviewed * 3)) * 100 || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in">
      <Card className="p-6 bg-gradient-to-br from-medical-primary/5 to-transparent border-medical-accent/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-medical-primary/10 rounded-lg">
            <Brain className="w-5 h-5 text-medical-primary" />
          </div>
          <h3 className="font-semibold">Study Progress</h3>
        </div>
        <Progress value={progressPercentage} className="h-2 mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>{cardsReviewed} of {totalCards} cards</span>
          <span>{Math.round(progressPercentage)}% complete</span>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-medical-secondary/5 to-transparent border-medical-accent/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-medical-secondary/10 rounded-lg">
            <Zap className="w-5 h-5 text-medical-secondary" />
          </div>
          <h3 className="font-semibold">Mastery Score</h3>
        </div>
        <Progress value={masteryScore} className="h-2 mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>Current mastery</span>
          <span>{Math.round(masteryScore)}%</span>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-medical-accent/5 to-transparent border-medical-accent/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-medical-accent/10 rounded-lg">
            <Clock className="w-5 h-5 text-medical-accent" />
          </div>
          <h3 className="font-semibold">Study Time</h3>
        </div>
        <p className="text-2xl font-bold">{studyDuration}</p>
        <p className="text-sm text-muted-foreground mt-1">Minutes studied</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-medical-primary/5 to-transparent border-medical-accent/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-medical-primary/10 rounded-lg">
            <Trophy className="w-5 h-5 text-medical-primary" />
          </div>
          <h3 className="font-semibold">Study Streak</h3>
        </div>
        <p className="text-2xl font-bold">{streakCount}</p>
        <p className="text-sm text-muted-foreground mt-1">Current streak</p>
      </Card>
    </div>
  );
};