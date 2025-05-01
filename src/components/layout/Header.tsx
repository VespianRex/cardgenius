
import { Stethoscope } from "lucide-react";
import { MainNavigation } from "./MainNavigation";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center gap-2">
          <div className="flex items-center justify-center rounded-md bg-medical-primary p-2">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              Medical Flashcards
              <span className="ml-1 text-xs font-normal text-muted-foreground">Study Assistant</span>
            </h1>
          </div>
        </div>
        <MainNavigation />
      </div>
    </header>
  );
};
