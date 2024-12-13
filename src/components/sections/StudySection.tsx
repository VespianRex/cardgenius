import { FileUpload } from "@/components/FileUpload";
import { FlashcardSection } from "@/components/FlashcardSection";
import { Hospital } from "lucide-react";

interface StudySectionProps {
  showFlashcards: boolean;
  demoFlashcards: Array<{ front: string; back: string }>;
}

export const StudySection = ({ showFlashcards, demoFlashcards }: StudySectionProps) => {
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
};