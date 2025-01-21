import { Button } from "@/components/ui/button";
import { Brain, Clock, Settings } from "lucide-react";

interface StudyHeaderProps {
  title: string;
  subtitle?: string;
  onSettingsClick?: () => void;
  studyTime?: string;
  cardsRemaining?: number;
}

export const StudyHeader = ({
  title,
  subtitle,
  onSettingsClick,
  studyTime,
  cardsRemaining,
}: StudyHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-card rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {studyTime && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{studyTime}</span>
            </div>
          )}
          
          {cardsRemaining !== undefined && (
            <div className="text-sm text-muted-foreground">
              {cardsRemaining} cards remaining
            </div>
          )}

          {onSettingsClick && (
            <Button
              variant="outline"
              size="icon"
              onClick={onSettingsClick}
              className="hover:bg-accent"
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};