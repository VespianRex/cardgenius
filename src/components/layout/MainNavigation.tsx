import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Brain, Book, BarChart, User, Settings, HelpCircle } from "lucide-react";

export function MainNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            Home
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer">Study</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 bg-popover shadow-lg rounded-lg">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/study"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Study Session</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Start a new study session with your flashcards
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/library"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Library</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Manage your flashcard decks and collections
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/analytics"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Analytics</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      View your study statistics and progress
                    </p>
                  </Link>
                </NavigationMenuLink>
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