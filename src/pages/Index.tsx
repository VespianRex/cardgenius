import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { FlashcardSection } from "@/components/FlashcardSection";
import { Brain, Book, Clock, Plus, Heart, Stethoscope, Hospital } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [activeTab, setActiveTab] = useState('study');

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

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <ThemeToggle />
      
      {/* Header section */}
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
        {/* Navigation pills */}
        <nav className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <Button 
            variant="ghost" 
            className={`rounded-full hover:bg-medical-accent/20 gap-2 min-w-fit transition-all duration-300 ${
              activeTab === 'study' ? 'bg-medical-accent/30 text-medical-primary font-medium shadow-sm' : ''
            }`}
            onClick={() => setActiveTab('study')}
          >
            <Brain className="w-4 h-4" />
            Study
          </Button>
          <Button 
            variant="ghost" 
            className={`rounded-full hover:bg-medical-accent/20 gap-2 min-w-fit transition-all duration-300 ${
              activeTab === 'library' ? 'bg-medical-accent/30 text-medical-primary font-medium shadow-sm' : ''
            }`}
            onClick={() => setActiveTab('library')}
          >
            <Book className="w-4 h-4" />
            Library
          </Button>
          <Button 
            variant="ghost" 
            className={`rounded-full hover:bg-medical-accent/20 gap-2 min-w-fit transition-all duration-300 ${
              activeTab === 'recent' ? 'bg-medical-accent/30 text-medical-primary font-medium shadow-sm' : ''
            }`}
            onClick={() => setActiveTab('recent')}
          >
            <Clock className="w-4 h-4" />
            Recent
          </Button>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-4 mb-8">
          {!showFlashcards && (
            <Button 
              onClick={() => setShowFlashcards(true)}
              className="bg-medical-primary hover:bg-medical-primary/90 text-white rounded-full px-8 py-6 gap-2 shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Generate Flashcards
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-medical-accent/20 transition-all duration-300"
          >
            <Heart className="w-6 h-6 text-medical-primary" />
          </Button>
        </div>

        <div className="space-y-8">
          {/* Upload section */}
          <div className="bg-card rounded-xl p-6 hover:bg-accent/50 transition-colors border">
            <div className="flex items-center gap-4 mb-4">
              <Hospital className="w-6 h-6 text-medical-primary" />
              <h2 className="text-xl font-bold">Upload Medical Documents</h2>
            </div>
            <FileUpload />
          </div>

          {/* Flashcards section */}
          {showFlashcards && <FlashcardSection flashcards={demoFlashcards} />}
        </div>
      </main>
    </div>
  );
};

export default Index;