import { Button } from "./ui/button";
import { Brain, Zap, Clock, Repeat } from "lucide-react";

interface StudyModeSelectorProps {
  onSelectMode: (mode: 'regular' | 'cram' | 'review' | 'scheduled') => void;
}

export const StudyModeSelector = ({ onSelectMode }: StudyModeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {[
        { id: 'regular', icon: Brain, label: 'Regular Study', description: 'Study new and due cards' },
        { id: 'cram', icon: Zap, label: 'Cram Mode', description: 'Review all cards intensively' },
        { id: 'review', icon: Repeat, label: 'Review Due', description: 'Focus on due cards only' },
        { id: 'scheduled', icon: Clock, label: 'Scheduled', description: 'Follow your study schedule' },
      ].map(({ id, icon: Icon, label, description }) => (
        <Button
          key={id}
          variant="outline"
          className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-accent/10 transition-colors"
          onClick={() => onSelectMode(id as 'regular' | 'cram' | 'review' | 'scheduled')}
        >
          <Icon className="w-6 h-6 text-medical-primary" />
          <span className="font-medium">{label}</span>
          <span className="text-sm text-muted-foreground text-center">{description}</span>
        </Button>
      ))}
    </div>
  );
};