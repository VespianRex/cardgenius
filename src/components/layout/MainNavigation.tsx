import { Brain, Book, GraduationCap, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";

interface MainNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MainNavigation = ({ activeTab, onTabChange }: MainNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string, tab: string) => {
    onTabChange(tab);
    navigate(path);
  };

  const goBack = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div className="space-y-4">
      {location.pathname !== '/' && (
        <Button 
          variant="ghost" 
          onClick={goBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      )}
      
      <Menubar className="mb-8 bg-card border-medical-accent/20">
        <MenubarMenu>
          <MenubarTrigger 
            className={`gap-2 cursor-pointer ${activeTab === 'study' ? 'text-medical-primary' : ''}`}
            onClick={() => handleNavigation('/study', 'study')}
          >
            <Brain className="w-4 h-4" />
            Study
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => handleNavigation('/study/new', 'study')}>
              New Session
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={() => handleNavigation('/study/review', 'study')}>
              Review Due Cards
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => handleNavigation('/study/stats', 'study')}>
              Statistics
              <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger 
            className={`gap-2 cursor-pointer ${activeTab === 'library' ? 'text-medical-primary' : ''}`}
            onClick={() => handleNavigation('/library', 'library')}
          >
            <Book className="w-4 h-4" />
            Library
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => handleNavigation('/library/decks', 'library')}>
              All Decks
            </MenubarItem>
            <MenubarItem onClick={() => handleNavigation('/library/categories', 'library')}>
              Categories
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => handleNavigation('/library/import', 'library')}>
              Import Deck
            </MenubarItem>
            <MenubarItem onClick={() => handleNavigation('/library/export', 'library')}>
              Export Deck
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger 
            className={`gap-2 cursor-pointer ${activeTab === 'analytics' ? 'text-medical-primary' : ''}`}
            onClick={() => handleNavigation('/analytics', 'analytics')}
          >
            <GraduationCap className="w-4 h-4" />
            Analytics
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => handleNavigation('/analytics/overview', 'analytics')}>
              Overview
            </MenubarItem>
            <MenubarItem onClick={() => handleNavigation('/analytics/detailed', 'analytics')}>
              Detailed Stats
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => handleNavigation('/analytics/export', 'analytics')}>
              Export Report
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};