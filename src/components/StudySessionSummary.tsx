import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Target, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudySessionSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    cardsReviewed: number;
    correctAnswers: number;
    studyTime: number;
    streak: number;
  };
}

export const StudySessionSummary = ({ isOpen, onClose, stats }: StudySessionSummaryProps) => {
  const navigate = useNavigate();
  const accuracy = (stats.correctAnswers / stats.cardsReviewed) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Session Complete! 🎉</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center space-y-2">
            <p className="text-2xl font-bold">{stats.cardsReviewed} Cards Reviewed</p>
            <p className="text-sm text-muted-foreground">Great job on completing your study session!</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Accuracy</span>
                <span className="font-medium">{accuracy.toFixed(1)}%</span>
              </div>
              <Progress value={accuracy} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center space-y-1">
                <div className="mx-auto w-8 h-8 flex items-center justify-center bg-medical-primary/10 rounded-full">
                  <Trophy className="w-4 h-4 text-medical-primary" />
                </div>
                <p className="text-sm font-medium">{stats.streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>

              <div className="text-center space-y-1">
                <div className="mx-auto w-8 h-8 flex items-center justify-center bg-medical-secondary/10 rounded-full">
                  <Clock className="w-4 h-4 text-medical-secondary" />
                </div>
                <p className="text-sm font-medium">{stats.studyTime}m</p>
                <p className="text-xs text-muted-foreground">Study Time</p>
              </div>

              <div className="text-center space-y-1">
                <div className="mx-auto w-8 h-8 flex items-center justify-center bg-medical-accent/10 rounded-full">
                  <Target className="w-4 h-4 text-medical-accent" />
                </div>
                <p className="text-sm font-medium">{stats.correctAnswers}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Review Cards
            </Button>
            <Button 
              className="flex-1"
              onClick={() => navigate("/analytics")}
            >
              See Analytics
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};