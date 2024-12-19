import { Button } from "./ui/button";
import { Timer, BookOpen, Plus, History } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";

export const QuickActions = () => {
  const handleQuickStart = () => {
    toast.success("Starting quick study session");
  };

  const handleRecentCards = () => {
    toast.info("Loading recent cards");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            size="lg" 
            className="h-14 w-14 rounded-full bg-medical-primary hover:bg-medical-primary/90 shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleQuickStart} className="gap-2">
            <Timer className="h-4 w-4" />
            Quick Study
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleRecentCards} className="gap-2">
            <History className="h-4 w-4" />
            Recent Cards
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};