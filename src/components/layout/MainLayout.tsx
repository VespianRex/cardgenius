import { Meteors } from "@/components/ui/meteors";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Brain, Book, BarChart, User, Settings, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Meteors number={40} className="absolute inset-0" />
      
      <div className="relative z-10">
        <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => navigate('/study')}>
                    <Brain className="w-4 h-4 mr-2" />
                    Study
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                            <div className="mb-2 mt-4 text-lg font-medium">Study Dashboard</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Track your progress and start learning
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li onClick={() => navigate('/study/new')}>New Session</li>
                      <li onClick={() => navigate('/study/review')}>Review Cards</li>
                      <li onClick={() => navigate('/study/stats')}>Statistics</li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => navigate('/library')}>
                    <Book className="w-4 h-4 mr-2" />
                    Library
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li onClick={() => navigate('/library/decks')}>All Decks</li>
                      <li onClick={() => navigate('/library/categories')}>Categories</li>
                      <li onClick={() => navigate('/library/import')}>Import</li>
                      <li onClick={() => navigate('/library/export')}>Export</li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => navigate('/analytics')}>
                    <BarChart className="w-4 h-4 mr-2" />
                    Analytics
                  </NavigationMenuTrigger>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => navigate('/profile')}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </NavigationMenuTrigger>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => navigate('/settings')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </NavigationMenuTrigger>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => navigate('/help')}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
        
        <main className="relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
};