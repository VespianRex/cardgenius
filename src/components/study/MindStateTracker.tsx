
import { useState, useEffect } from "react";
import { Brain, Coffee, Moon } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const MindStateTracker = () => {
  const [lastBreak, setLastBreak] = useState<Date>(new Date());
  const [focusScore, setFocusScore] = useState(100);
  
  useEffect(() => {
    const timer = setInterval(() => {
      const timeSinceBreak = (new Date().getTime() - lastBreak.getTime()) / (1000 * 60);
      if (timeSinceBreak > 45 && focusScore > 20) {
        setFocusScore(prev => Math.max(20, prev - 5));
        toast.info("Your focus is declining. Consider taking a short break!", {
          id: "focus-warning"
        });
      }
    }, 1000 * 60 * 5); // Check every 5 minutes

    return () => clearInterval(timer);
  }, [lastBreak, focusScore]);

  const handleBreakTaken = () => {
    setLastBreak(new Date());
    setFocusScore(100);
    toast.success("Break recorded! Your focus has been refreshed.");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Mind State
        </CardTitle>
        <CardDescription>Track your focus and energy levels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Focus Level</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${focusScore}%` }}
                />
              </div>
              <span className="text-sm font-medium">{focusScore}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Break</span>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                {Math.round((new Date().getTime() - lastBreak.getTime()) / (1000 * 60))}m ago
              </span>
            </div>
          </div>
          <button
            onClick={handleBreakTaken}
            className="w-full px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Record Break
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
