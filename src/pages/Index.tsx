import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { FlashcardSection } from "@/components/FlashcardSection";
import { DeckList } from "@/components/DeckManagement/DeckList";
import { Brain, Book, Clock, Plus, Heart, Stethoscope, Hospital, Settings, GraduationCap, History } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenubarShortcut,
} from "@/components/ui/menubar";

const Index = () => {
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [activeTab, setActiveTab] = useState('library');

  const demoFlashcards = [
    {
      front: "What is the primary function of hemoglobin?",
      back: "To transport oxygen throughout the body by binding to oxygen molecules in the lungs and releasing them in tissues."
    },
    {
      front: "Name the four chambers of the heart",
      back: "Right atrium, left atrium, right ventricle, and left ventricle"
    },
    {
      front: "What is the function of the hypothalamus?",
      back: "The hypothalamus controls body temperature, hunger, thirst, sleep, and emotional behavior"
    },
    {
      front: "What are the three types of muscle tissue?",
      back: "1. Skeletal muscle (voluntary)\n2. Cardiac muscle (heart)\n3. Smooth muscle (involuntary)"
    },
    {
      front: "Define homeostasis",
      back: "The maintenance of a stable internal environment in the body through various regulatory mechanisms and feedback loops"
    },
    {
      front: "What is the function of insulin?",
      back: "Insulin regulates blood glucose levels by facilitating glucose uptake into cells and promoting storage as glycogen"
    },
    {
      front: "List the major components of the nervous system",
      back: "1. Central Nervous System (brain and spinal cord)\n2. Peripheral Nervous System (cranial and spinal nerves)"
    },
    {
      front: "What is the role of the lymphatic system?",
      back: "The lymphatic system helps maintain fluid balance, absorbs fats from digestion, and plays a crucial role in immune system function"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'study':
        return showFlashcards ? (
          <FlashcardSection flashcards={demoFlashcards} />
        ) : (
          <div className="space-y-8">
            <div className="bg-card rounded-xl p-6 hover:bg-accent/50 transition-colors border">
              <div className="flex items-center gap-4 mb-4">
                <Hospital className="w-6 h-6 text-medical-primary" />
                <h2 className="text-xl font-bold">Upload Medical Documents</h2>
              </div>
              <FileUpload />
            </div>
          </div>
        );
      case 'library':
        return <DeckList />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <header className="bg-gradient-to-b from-medical-primary/20 to-background p-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-medical-primary rounded-lg shadow-lg">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase text-muted-foreground">Study Assistant</h2>
            <h1 className="text-4xl font-bold mt-1">Medical Flashcards</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-6">
        <Menubar className="mb-8 bg-card border-medical-accent/20">
          <MenubarMenu>
            <MenubarTrigger 
              className={`gap-2 ${activeTab === 'study' ? 'text-medical-primary' : ''}`}
              onClick={() => setActiveTab('study')}
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
              onClick={() => setActiveTab('library')}
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
              className={`gap-2 ${activeTab === 'recent' ? 'text-medical-primary' : ''}`}
              onClick={() => setActiveTab('recent')}
            >
              <Clock className="w-4 h-4" />
              Recent
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Last Session</MenubarItem>
              <MenubarItem>Study History</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Progress Report</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
