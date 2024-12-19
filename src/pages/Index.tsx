import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Header } from "@/components/layout/Header";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { StudySection } from "@/components/sections/StudySection";
import { DeckList } from "@/components/DeckManagement/DeckList";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { FlashcardEditor } from "@/components/FlashcardManagement/FlashcardEditor";
import { FlashcardBulkImport } from "@/components/FlashcardManagement/FlashcardBulkImport";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [activeTab, setActiveTab] = useState('library');
  const [showEditor, setShowEditor] = useState(false);

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

  const handleSaveCard = (card: { front: string; back: string; tags: string[] }) => {
    console.log("Saving card:", card);
    setShowEditor(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'study':
        return <StudySection showFlashcards={showFlashcards} demoFlashcards={demoFlashcards} />;
      case 'library':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Flashcard Library</h2>
              <Button onClick={() => setShowEditor(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Card
              </Button>
            </div>
            {showEditor ? (
              <FlashcardEditor
                onSave={handleSaveCard}
                onCancel={() => setShowEditor(false)}
              />
            ) : (
              <>
                <FlashcardBulkImport />
                <DeckList />
              </>
            )}
          </div>
        );
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <MainNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;