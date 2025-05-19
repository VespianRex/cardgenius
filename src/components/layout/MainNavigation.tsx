
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Home,
  BookOpen,
  BarChart2,
  User,
  Settings,
  HelpCircle,
  Menu,
  FileText,
  X,
  Users,
  Brain
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Study", path: "/study" },
  { icon: BookOpen, label: "Library", path: "/library" },
  { icon: Brain, label: "Mnemonics", path: "/mnemonics" },
  { icon: BarChart2, label: "Analytics", path: "/analytics" },
  { icon: FileText, label: "Roadmap", path: "/roadmap" },
  { icon: Users, label: "Collaboration", path: "/collaboration" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help", path: "/help" }
];

export function MainNavigation() {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <nav className="flex-1">
        <ul className="flex items-center gap-1 md:gap-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 gap-1"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden md:inline-flex">{item.label}</span>
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden ml-auto">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <nav className="flex flex-col gap-4 mt-8">
          {menuItems.map((item) => (
            <SheetClose key={item.path} asChild>
              <Link 
                to={item.path}
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-accent"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
