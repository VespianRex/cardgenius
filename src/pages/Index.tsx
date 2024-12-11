import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { FlashcardSection } from "@/components/FlashcardSection";
import { Brain, Book, Clock, Plus, Heart, Stethoscope, Hospital } from "lucide-react";

const Index = () => {
  const [showFlashcards, setShowFlashcards] = useState(false);

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
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header section */}
      <header className="bg-gradient-to-b from-medical-primary/20 to-[#121212] p-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-medical-primary rounded-lg shadow-lg">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase text-gray-400">Study Assistant</h2>
            <h1 className="text-4xl font-bold mt-1">Medical Flashcards</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-6">
        {/* Navigation pills */}
        <nav className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <Button variant="ghost" className="rounded-full hover:bg-white/10 gap-2 min-w-fit">
            <Brain className="w-4 h-4" />
            Study
          </Button>
          <Button variant="ghost" className="rounded-full hover:bg-white/10 gap-2 min-w-fit">
            <Book className="w-4 h-4" />
            Library
          </Button>
          <Button variant="ghost" className="rounded-full hover:bg-white/10 gap-2 min-w-fit">
            <Clock className="w-4 h-4" />
            Recent
          </Button>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-4 mb-8">
          {!showFlashcards && (
            <Button 
              onClick={() => setShowFlashcards(true)}
              className="bg-medical-secondary hover:bg-medical-secondary/90 text-white rounded-full px-8 py-6 gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Generate Flashcards
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-white/10 transition-colors"
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>

        <div className="space-y-8">
          {/* Upload section */}
          <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <Hospital className="w-6 h-6 text-medical-accent" />
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
