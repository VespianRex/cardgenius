import { useState, useEffect } from "react";
import { Flashcard } from "./Flashcard";
import { toast } from "sonner";
import { QuickActions } from "./QuickActions";
import { KeyboardManager } from "./KeyboardManager";
import { StudyHeader } from "./study/StudyHeader";
import { StudyControls } from "./study/StudyControls";
import { calculateNextReview, isCardDue } from "../utils/srsSystem";
import { trackStudyProgress, generateStudyInsights } from "../utils/analyticsUtils";
import { ReviewQueueManager } from "../utils/queueManager";

interface FlashcardSectionProps {
  flashcards: Array<{ front: string; back: string }>;
}

export const FlashcardSection = ({ flashcards }: FlashcardSectionProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [startTime] = useState(new Date());
  const [ratings, setRatings] = useState({ easy: 0, medium: 0, hard: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [studyMode, setStudyMode] = useState<'regular' | 'cram' | 'review' | 'scheduled'>('regular');
  const [streak, setStreak] = useState(0);
  const [queueManager, setQueueManager] = useState<ReviewQueueManager | null>(null);
  const [analytics, setAnalytics] = useState({
    totalCards: flashcards.length,
    cardsReviewed: 0,
    correctAnswers: 0,
    streak: 0,
    studyTime: 0,
    retentionRate: 0,
  });

  useEffect(() => {
    const manager = new ReviewQueueManager(flashcards, {
      mode: studyMode,
      maxCards: 20,
      includeNew: true,
    });
    setQueueManager(manager);
    console.log('Initialized ReviewQueueManager');
  }, [studyMode, flashcards]);

  const handleNextCard = () => {
    if (!queueManager) return;
    
    const nextIndex = queueManager.getNext();
    if (nextIndex !== null) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCardIndex(nextIndex);
        setShowRating(false);
        setIsAnimating(false);
      }, 300);
    } else {
      toast.success("Study session complete! 🎉");
      const insights = generateStudyInsights(analytics);
      insights.forEach(insight => toast.info(insight));
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCardIndex(prev => prev - 1);
        setShowRating(false);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleCardFlip = (isFlipped: boolean) => {
    if (isFlipped) {
      setShowRating(true);
    }
  };

  const handleDifficultyRating = (difficulty: 'easy' | 'medium' | 'hard', confidence: number) => {
    if (!queueManager) return;

    setRatings(prev => ({
      ...prev,
      [difficulty]: prev[difficulty] + 1
    }));

    // Update analytics
    const newAnalytics = {
      ...analytics,
      cardsReviewed: analytics.cardsReviewed + 1,
      correctAnswers: difficulty === 'easy' ? analytics.correctAnswers + 1 : analytics.correctAnswers,
      streak: difficulty === 'easy' ? analytics.streak + 1 : 0,
      studyTime: Math.floor((new Date().getTime() - startTime.getTime()) / 60000),
      retentionRate: ((analytics.correctAnswers + (difficulty === 'easy' ? 1 : 0)) / (analytics.cardsReviewed + 1)) * 100,
    };

    setAnalytics(newAnalytics);
    trackStudyProgress(newAnalytics);

    if (difficulty === 'easy' && confidence >= 4) {
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak % 5 === 0) {
          toast.success(`🔥 ${newStreak} card streak! Keep it up!`);
        }
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    const { nextInterval, newEaseFactor } = calculateNextReview(
      confidence,
      1,
      2.5
    );

    console.log(`Next review in ${nextInterval} days with ease factor ${newEaseFactor}`);
    queueManager.markReviewed(currentCardIndex, confidence);
    handleNextCard();
  };

  const handleStudyModeChange = (mode: 'regular' | 'cram' | 'review' | 'scheduled') => {
    setStudyMode(mode);
    if (queueManager) {
      queueManager.reset();
    }
    toast.info(`Switched to ${mode} mode`);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <StudyHeader 
        currentCardIndex={currentCardIndex}
        totalCards={flashcards.length}
        startTime={startTime}
        ratings={ratings}
        streak={streak}
        onStudyModeChange={handleStudyModeChange}
      />

      <KeyboardManager 
        onNavigateLeft={handlePrevCard}
        onNavigateRight={handleNextCard}
        onFlipCard={() => {
          const cardElement = document.querySelector('.flashcard') as HTMLElement;
          if (cardElement) cardElement.click();
        }}
        onRateEasy={() => handleDifficultyRating('easy', 5)}
        onRateMedium={() => handleDifficultyRating('medium', 5)}
        onRateHard={() => handleDifficultyRating('hard', 5)}
        onToggleShortcuts={() => setShowKeyboardShortcuts(prev => !prev)}
        showRating={showRating}
      />

      <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <Flashcard
          front={flashcards[currentCardIndex].front}
          back={flashcards[currentCardIndex].back}
          onFlip={handleCardFlip}
        />
      </div>
      
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

      <QuickActions />
    </div>
  );
};