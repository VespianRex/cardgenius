import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Brain, Book, BarChart, User, Settings, HelpCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function MainNavigation() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu className="max-w-full w-full justify-start relative z-[100]">
      <NavigationMenuList className={`${isMobile ? 'flex-col space-y-2' : 'flex-row'}`}>
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            Home
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem className="relative group">
          <NavigationMenuTrigger className="cursor-pointer relative z-[100]">Study</NavigationMenuTrigger>
          <NavigationMenuContent className="absolute z-[100] data-[motion=from-start]:animate-enter data-[motion=from-end]:animate-enter data-[motion=to-start]:animate-exit data-[motion=to-end]:animate-exit">
            <ul className="grid w-[300px] gap-3 p-4 bg-popover shadow-lg rounded-lg border border-border">
              <li className="cursor-pointer">
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
              <li className="cursor-pointer">
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
              <li className="cursor-pointer">
                <Link
                  to="/analytics"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Analytics</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    View your study statistics and progress
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