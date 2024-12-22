import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, Trophy, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface StudyGoal {
  type: 'daily' | 'weekly' | 'monthly';
  target: number;
  current: number;
}

export const StudyGoals = () => {
  const [goals, setGoals] = useState<StudyGoal[]>([
    { type: 'daily', target: 50, current: 0 },
    { type: 'weekly', target: 200, current: 0 },
    { type: 'monthly', target: 1000, current: 0 }
  ]);

  useEffect(() => {
    const savedGoals = localStorage.getItem('studyGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const updateProgress = (type: 'daily' | 'weekly' | 'monthly', amount: number) => {
    setGoals(prev => {
      const updated = prev.map(goal => {
        if (goal.type === type) {
          const newCurrent = Math.min(goal.current + amount, goal.target);
          if (newCurrent === goal.target) {
            toast.success(`🎉 Congratulations! You've reached your ${type} study goal!`);
          }
          return { ...goal, current: newCurrent };
        }
        return goal;
      });
      localStorage.setItem('studyGoals', JSON.stringify(updated));
      return updated;
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return <Target className="w-5 h-5 text-blue-500" />;
      case 'weekly':
        return <Calendar className="w-5 h-5 text-purple-500" />;
      case 'monthly':
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {goals.map((goal) => (
        <Card key={goal.type} className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {getIcon(goal.type)}
            <h3 className="font-semibold capitalize">{goal.type} Goal</h3>
          </div>
          <Progress value={(goal.current / goal.target) * 100} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">
            {goal.current} / {goal.target} cards
          </p>
        </Card>
      ))}
    </div>
  );
};