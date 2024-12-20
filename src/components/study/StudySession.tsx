import { useState, useEffect } from "react";
import { StudyHeader } from "./StudyHeader";
import { StudyControls } from "./StudyControls";
import { FlashcardDisplay } from "./FlashcardDisplay";
import { useStudySession } from "../../hooks/useStudySession";
import { useStudyAnalytics } from "../../hooks/useStudyAnalytics";
import { toast } from "sonner";

interface StudySessionProps {
  flashcards: Array<{ front: string; back: string }>;
}

export const StudySession = ({ flashcards }: StudySessionProps) => {
  const {
    currentCardIndex,
    showRating,
    handleNextCard,
    handlePrevCard,
    handleCardFlip,
    handleDifficultyRating,
    studyMode,
    setStudyMode,
    queueManager
  } = useStudySession(flashcards);

  const {
    analytics,
    streak,
    startTime,
    ratings
  } = useStudyAnalytics();

  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  if (!flashcards.length) {
    return <div>No flashcards available</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <StudyHeader 
        currentCardIndex={currentCardIndex}
        totalCards={flashcards.length}
        startTime={startTime}
        ratings={ratings}
        streak={streak}
        onStudyModeChange={setStudyMode}
      />

      <FlashcardDisplay
        card={flashcards[currentCardIndex]}
        onFlip={handleCardFlip}
        showRating={showRating}
      />
      
      <StudyControls 
        currentCardIndex={currentCardIndex}
        totalCards={queueManager?.getRemainingCount() ?? flashcards.length}
        showRating={showRating}
        showKeyboardShortcuts={showKeyboardShortcuts}
        onPrevious={handlePrevCard}
        onNext={handleNextCard}
        onDifficultyRate={handleDifficultyRating}
        onToggleKeyboardShortcuts={() => setShowKeyboardShortcuts(prev => !prev)}
      />
    </div>
  );
};