import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Trophy, Award, Zap, Brain } from 'lucide-react';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  progress: number;
  target: number;
  unlocked: boolean;
}

export const AchievementSystem = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'streak_master',
      title: 'Streak Master',
      description: 'Maintain a 7-day study streak',
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      progress: 0,
      target: 7,
      unlocked: false
    },
    {
      id: 'quick_learner',
      title: 'Quick Learner',
      description: 'Complete 100 cards in a day',
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      progress: 0,
      target: 100,
      unlocked: false
    },
    {
      id: 'memory_master',
      title: 'Memory Master',
      description: 'Achieve 90% retention rate',
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      progress: 0,
      target: 90,
      unlocked: false
    }
  ]);

  const checkAchievement = (id: string, currentValue: number) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === id && !achievement.unlocked) {
        const newProgress = Math.min(currentValue, achievement.target);
        const newUnlocked = newProgress >= achievement.target;
        
        if (newUnlocked) {
          toast.success(`🏆 Achievement Unlocked: ${achievement.title}!`, {
            description: achievement.description
          });
        }
        
        return {
          ...achievement,
          progress: newProgress,
          unlocked: newUnlocked
        };
      }
      return achievement;
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {achievements.map((achievement) => (
        <Card 
          key={achievement.id}
          className={`p-4 ${achievement.unlocked ? 'bg-gradient-to-br from-yellow-50 to-transparent' : ''}`}
        >
          <div className="flex items-center gap-3">
            {achievement.icon}
            <div>
              <h3 className="font-semibold">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-medical-primary rounded-full transition-all duration-500"
                style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {achievement.progress} / {achievement.target}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};