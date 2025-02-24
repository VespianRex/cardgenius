
import { Meteors } from "@/components/ui/meteors";
import { MainNavigation } from "./MainNavigation";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Meteors number={40} className="absolute inset-0 pointer-events-none" />
      
      <div>
        <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="w-full max-w-7xl mx-auto px-4 py-3">
            <MainNavigation />
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
