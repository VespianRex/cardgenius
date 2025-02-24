
import { Meteors } from "@/components/ui/meteors";
import { MainNavigation } from "./MainNavigation";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Meteors number={40} className="absolute inset-0 pointer-events-none" />
      
      <div className="relative">
        <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-[49]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <MainNavigation />
          </div>
        </nav>
        
        <main className="relative container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
