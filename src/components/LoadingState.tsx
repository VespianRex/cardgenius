import { Card } from "@/components/ui/card";
import { Brain } from "lucide-react";

export const LoadingState = () => {
  return (
    <Card className="p-8 flex flex-col items-center justify-center space-y-4 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-medical-primary/10 flex items-center justify-center">
        <Brain className="w-6 h-6 text-medical-primary animate-bounce" />
      </div>
      <div className="space-y-2 text-center">
        <h3 className="font-medium">Loading your study session...</h3>
        <p className="text-sm text-muted-foreground">Preparing your flashcards</p>
      </div>
    </Card>
  );
};