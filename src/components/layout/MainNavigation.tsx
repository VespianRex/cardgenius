
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

export function MainNavigation() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu className="max-w-full w-full justify-start">
      <NavigationMenuList className={`${isMobile ? 'flex-col items-start space-y-2 w-full' : 'flex-row'}`}>
        <NavigationMenuItem className={isMobile ? 'w-full' : ''}>
          <Link to="/" className={`${navigationMenuTriggerStyle()} ${isMobile ? 'w-full justify-start' : ''}`}>
            Home
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem className={isMobile ? 'w-full' : ''}>
          <NavigationMenuTrigger className={`cursor-pointer ${isMobile ? 'w-full justify-start' : ''}`}>
            Study
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className={`grid gap-3 p-4 bg-popover shadow-lg rounded-lg border border-border ${isMobile ? 'w-[calc(100vw-2rem)]' : 'w-[300px]'}`}>
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

        <NavigationMenuItem className={isMobile ? 'w-full' : ''}>
          <Link to="/analytics" className={`${navigationMenuTriggerStyle()} ${isMobile ? 'w-full justify-start' : ''}`}>
            Analytics
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem className={isMobile ? 'w-full' : ''}>
          <Link to="/profile" className={`${navigationMenuTriggerStyle()} ${isMobile ? 'w-full justify-start' : ''}`}>
            Profile
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem className={isMobile ? 'w-full' : ''}>
          <Link to="/settings" className={`${navigationMenuTriggerStyle()} ${isMobile ? 'w-full justify-start' : ''}`}>
            Settings
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem className={isMobile ? 'w-full' : ''}>
          <Link to="/help" className={`${navigationMenuTriggerStyle()} ${isMobile ? 'w-full justify-start' : ''}`}>
            Help
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
