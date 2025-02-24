
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function MainNavigation() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  if (!isMobile) {
    return (
      <NavigationMenu className="max-w-full w-full justify-start">
        <NavigationMenuList className="flex-row">
          <NavigationMenuItem>
            <Link to="/" className={navigationMenuTriggerStyle()}>
              Home
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="cursor-pointer">
              Study
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 bg-popover shadow-lg rounded-lg border border-border">
                <li>
                  <Link
                    to="/study"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Study Session</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Start a new study session with your flashcards
                    </p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/library"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Library</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Manage your flashcard decks and collections
                    </p>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/analytics" className={navigationMenuTriggerStyle()}>
              Analytics
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/profile" className={navigationMenuTriggerStyle()}>
              Profile
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/settings" className={navigationMenuTriggerStyle()}>
              Settings
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/help" className={navigationMenuTriggerStyle()}>
              Help
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold">
          StudyApp
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-[57px] bg-background/80 backdrop-blur-sm border-b transform transition-transform duration-300 ease-in-out z-50",
          isOpen ? "translate-y-0" : "-translate-y-[150%]"
        )}
      >
        <nav className="container py-4">
          <ul className="space-y-2">
            <li className="w-full">
              <Link
                to="/"
                className="block w-full p-2 rounded-md hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="w-full">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem className="w-full">
                    <NavigationMenuTrigger className="w-full justify-start">
                      Study
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-[calc(100vw-2rem)] gap-3 p-4 bg-popover shadow-lg rounded-lg border border-border">
                        <li onClick={() => setIsOpen(false)}>
                          <Link
                            to="/study"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Study Session</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Start a new study session with your flashcards
                            </p>
                          </Link>
                        </li>
                        <li onClick={() => setIsOpen(false)}>
                          <Link
                            to="/library"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Library</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Manage your flashcard decks and collections
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
            <li className="w-full">
              <Link
                to="/analytics"
                className="block w-full p-2 rounded-md hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Analytics
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/profile"
                className="block w-full p-2 rounded-md hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/settings"
                className="block w-full p-2 rounded-md hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/help"
                className="block w-full p-2 rounded-md hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Help
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
