import { Stethoscope } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-medical-primary/20 to-background p-8">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-medical-primary rounded-lg shadow-lg">
          <Stethoscope className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase text-muted-foreground">Study Assistant</h2>
          <h1 className="text-4xl font-bold mt-1">Medical Flashcards</h1>
        </div>
      </div>
    </header>
  );
};