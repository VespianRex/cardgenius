import { Brain, Book, GraduationCap } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface MainNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MainNavigation = ({ activeTab, onTabChange }: MainNavigationProps) => {
  return (
    <Menubar className="mb-8 bg-card border-medical-accent/20">
      <MenubarMenu>
        <MenubarTrigger 
          className={`gap-2 ${activeTab === 'study' ? 'text-medical-primary' : ''}`}
          onClick={() => onTabChange('study')}
        >
          <Brain className="w-4 h-4" />
          Study
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Session
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Review Due Cards</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Statistics
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger 
          className={`gap-2 ${activeTab === 'library' ? 'text-medical-primary' : ''}`}
          onClick={() => onTabChange('library')}
        >
          <Book className="w-4 h-4" />
          Library
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>All Decks</MenubarItem>
          <MenubarItem>Categories</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Import Deck</MenubarItem>
          <MenubarItem>Export Deck</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger 
          className={`gap-2 ${activeTab === 'analytics' ? 'text-medical-primary' : ''}`}
          onClick={() => onTabChange('analytics')}
        >
          <GraduationCap className="w-4 h-4" />
          Analytics
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Overview</MenubarItem>
          <MenubarItem>Detailed Stats</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Export Report</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};