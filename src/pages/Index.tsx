import { FileUpload } from "@/components/FileUpload";
import { Flashcard } from "@/components/Flashcard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Index = () => {
  const [showFlashcards, setShowFlashcards] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container py-8">
        <h1 className="text-4xl font-bold text-center text-medical-primary mb-2">
          Medical Study Assistant
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Upload your medical documents and let AI help you study
        </p>

        <div className="max-w-2xl mx-auto space-y-8">
          <FileUpload />

          {showFlashcards && (
            <div className="animate-fade-in space-y-4">
              <Flashcard
                front="What is the primary function of hemoglobin?"
                back="To transport oxygen throughout the body by binding to oxygen molecules in the lungs and releasing them in tissues."
              />
              <div className="flex justify-center gap-4">
                <Button variant="outline">Previous</Button>
                <Button>Next</Button>
              </div>
            </div>
          )}

          {!showFlashcards && (
            <Button
              className="w-full"
              onClick={() => setShowFlashcards(true)}
            >
              Generate Flashcards
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;