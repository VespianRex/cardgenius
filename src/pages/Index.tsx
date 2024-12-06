import { FileUpload } from "@/components/FileUpload";
import { Flashcard } from "@/components/Flashcard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Heart, Stethoscope, Hospital, Brain, Book, Clock, Plus } from "lucide-react";

const Index = () => {
  const [showFlashcards, setShowFlashcards] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Spotify-style header with medical theme */}
      <header className="bg-gradient-to-b from-medical-primary/20 to-[#121212] p-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-medical-primary rounded-lg">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase text-gray-400">Study Assistant</h2>
            <h1 className="text-4xl font-bold mt-1">Medical Flashcards</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-6">
        {/* Spotify-style navigation pills */}
        <nav className="flex gap-4 mb-8">
          <Button variant="ghost" className="rounded-full hover:bg-white/10 gap-2">
            <Brain className="w-4 h-4" />
            Study
          </Button>
          <Button variant="ghost" className="rounded-full hover:bg-white/10 gap-2">
            <Book className="w-4 h-4" />
            Library
          </Button>
          <Button variant="ghost" className="rounded-full hover:bg-white/10 gap-2">
            <Clock className="w-4 h-4" />
            Recent
          </Button>
        </nav>

        {/* Action buttons row */}
        <div className="flex items-center gap-4 mb-8">
          {!showFlashcards && (
            <Button 
              onClick={() => setShowFlashcards(true)}
              className="bg-medical-secondary hover:bg-medical-secondary/90 text-white rounded-full px-8 py-6 gap-2"
            >
              <Plus className="w-5 h-5" />
              Generate Flashcards
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-white/10"
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>

        {/* Main content */}
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
          {showFlashcards && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <Flashcard
                  front="What is the primary function of hemoglobin?"
                  back="To transport oxygen throughout the body by binding to oxygen molecules in the lungs and releasing them in tissues."
                />
              </div>
              
              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline"
                  className="rounded-full border-white/10 hover:bg-white/10 hover:border-white/20"
                >
                  Previous
                </Button>
                <Button 
                  className="rounded-full bg-medical-secondary hover:bg-medical-secondary/90"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;