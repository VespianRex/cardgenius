import { useState, useEffect } from "react";
import { StudyHeader } from "./StudyHeader";
import { StudyControls } from "./StudyControls";
import { FlashcardDisplay } from "./FlashcardDisplay";
import { StudyGoals } from "./StudyGoals";
import { useStudySession } from "../../hooks/useStudySession";
import { useStudyAnalytics } from "../../hooks/useStudyAnalytics";
import { suggestMemoryTechnique, trackStudyHabit, getStudyStreak } from "../../utils/studyTechniques";
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
    ratings,
    updateAnalytics,
    exportAnalytics
  } = useStudyAnalytics();

  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = flashcards.flatMap(card => {
        const urls = [];
        const imgRegex = /\bhttps?:\/\/\S+?(?:jpg|jpeg|gif|png|webp)/gi;
        let match;
        
        while ((match = imgRegex.exec(card.front)) !== null) {
          urls.push(match[0]);
        }
        while ((match = imgRegex.exec(card.back)) !== null) {
          urls.push(match[0]);
        }
        
        return urls;
      });

      await Promise.all(
        imageUrls.map(url => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve; // Continue even if some images fail
            img.src = url;
          });
        })
      );

      setIsPreloading(false);
      console.log('Preloaded all card images');
    };

    preloadImages();
  }, [flashcards]);

  useEffect(() => {
    const studyDuration = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
    trackStudyHabit(studyDuration, ratings.easy + ratings.medium + ratings.hard);
    
    // Suggest memory technique every 5 cards
    if (currentCardIndex > 0 && currentCardIndex % 5 === 0) {
      const currentCard = flashcards[currentCardIndex];
      const technique = suggestMemoryTechnique(currentCard.front);
      toast.info(`Try this memory technique: ${technique.name}`, {
        description: technique.description,
        duration: 5000,
      });
    }
  }, [currentCardIndex, startTime, ratings]);

  if (!flashcards.length) {
    return <div>No flashcards available</div>;
  }

  if (isPreloading) {
    return <div>Loading cards...</div>;
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

      <StudyGoals />
      
      <FlashcardDisplay
        card={flashcards[currentCardIndex]}
        onFlip={handleCardFlip}
        showRating={showRating}
      />
      
      <StudyControls 
        currentCardIndex={currentCardIndex}
        totalCards={queueManager?.getRemainingCount() ?? flashcards.length}
        showRating={showRating}
        showKeyboardShortcuts={false}
        onPrevious={handlePrevCard}
        onNext={handleNextCard}
        onDifficultyRate={handleDifficultyRating}
        onToggleKeyboardShortcuts={() => {}}
      />
    </div>
  );
};