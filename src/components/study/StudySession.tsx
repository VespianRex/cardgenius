
import { useState, useEffect } from "react";
import { StudyHeader } from "./StudyHeader";
import { StudyControls } from "./StudyControls";
import { FlashcardDisplay } from "./FlashcardDisplay";
import { StudyGoals } from "./StudyGoals";
import { useStudySession } from "../../hooks/useStudySession";
import { useStudyAnalytics } from "../../hooks/useStudyAnalytics";
import { suggestMemoryTechnique, trackStudyHabit } from "../../utils/studyTechniques";
import { toast } from "sonner";
import { PerformanceIndicator } from "./PerformanceIndicator";
import { optimizeReviewSchedule, getMaturityLevel } from "../../utils/srs/reviewScheduler";
import { SRSCard } from "../../utils/srsSystem";

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
  const [isPaused, setIsPaused] = useState(false);
  const [currentMaturity, setCurrentMaturity] = useState(0);

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
            img.onerror = resolve;
            img.src = url;
          });
        })
      );

      setIsPreloading(false);
    };

    preloadImages();
  }, [flashcards]);

  useEffect(() => {
    if (currentCardIndex >= 0 && currentCardIndex < flashcards.length) {
      const card = flashcards[currentCardIndex] as SRSCard;
      setCurrentMaturity(getMaturityLevel(card));
    }
  }, [currentCardIndex, flashcards]);

  useEffect(() => {
    const studyDuration = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
    trackStudyHabit(studyDuration, ratings.easy + ratings.medium + ratings.hard);
    
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

  const studyTimeInMinutes = Math.floor((new Date().getTime() - startTime.getTime()) / (1000 * 60));

  const handleReset = () => {
    queueManager?.reset();
    toast.success("Study session reset");
  };

  const retention = ((ratings.easy * 3 + ratings.medium * 2) / 
    (Math.max(1, (ratings.easy + ratings.medium + ratings.hard) * 3))) * 100;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <StudyHeader 
        title="Study Session"
        subtitle={`Reviewing ${flashcards.length} cards`}
        onSettingsClick={() => {}}
        studyTime={`${Math.floor(studyTimeInMinutes / 60)}h ${studyTimeInMinutes % 60}m`}
        cardsRemaining={queueManager?.getRemainingCount() ?? flashcards.length}
      />

      <StudyGoals 
        dailyGoal={20}
        currentProgress={currentCardIndex}
        streakDays={streak}
        studyTime={studyTimeInMinutes}
      />

      <PerformanceIndicator
        correctStreak={streak}
        retention={retention}
        maturityLevel={currentMaturity}
      />
      
      <FlashcardDisplay
        card={flashcards[currentCardIndex]}
        onFlip={handleCardFlip}
        showRating={showRating}
      />
      
      <StudyControls 
        onNext={handleNextCard}
        onPrevious={handlePrevCard}
        onReset={handleReset}
        isPaused={isPaused}
        onPauseToggle={() => setIsPaused(!isPaused)}
        showPauseButton={true}
      />
    </div>
  );
};
