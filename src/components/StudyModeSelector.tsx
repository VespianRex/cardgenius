
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Clock, Brain, Zap } from "lucide-react";

interface StudyModeSelectorProps {
  onSelectMode: (mode: 'regular' | 'cram' | 'review' | 'scheduled') => void;
}

export const StudyModeSelector = ({ onSelectMode }: StudyModeSelectorProps) => {
  const studyModes = [
    {
      id: 'regular',
      name: 'Regular Study',
      description: 'Balanced learning with regular intervals',
      icon: BookOpen,
      color: 'bg-blue-100 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'cram',
      name: 'Cram Mode',
      description: 'Intensive study for quick review before exams',
      icon: Zap,
      color: 'bg-yellow-100 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      id: 'review',
      name: 'Review Mode',
      description: 'Focus on previously studied materials',
      icon: Brain,
      color: 'bg-purple-100 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'scheduled',
      name: 'Scheduled Review',
      description: 'Optimized intervals for long-term retention',
      icon: Clock,
      color: 'bg-green-100 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Study Mode</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studyModes.map((mode) => (
          <Card 
            key={mode.id}
            className={`p-4 cursor-pointer hover:shadow-md transition-shadow border-l-4 ${
              mode.color.includes('bg-') ? mode.color.replace('bg-', 'border-') : ''
            }`}
            onClick={() => onSelectMode(mode.id as any)}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${mode.color}`}>
                <mode.icon className={`h-5 w-5 ${mode.textColor}`} />
              </div>
              <div>
                <h3 className="font-medium">{mode.name}</h3>
                <p className="text-sm text-muted-foreground">{mode.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
