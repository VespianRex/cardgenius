import { StudySession } from "./study/StudySession";
import { QuickActions } from "./QuickActions";

interface FlashcardSectionProps {
  flashcards: Array<{ front: string; back: string }>;
}

export const FlashcardSection = ({ flashcards }: FlashcardSectionProps) => {
  return (
    <div className="space-y-8">
      <StudySession flashcards={flashcards} />
      <QuickActions />
    </div>
  );
};