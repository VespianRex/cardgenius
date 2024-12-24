import { useState, useEffect } from 'react';
import { ReviewQueueManager } from '../utils/queueManager';
import { calculateNextReview } from '../utils/srsSystem';
import { saveToStorage, loadFromStorage } from '../utils/storage/persistenceManager';
import { 
  optimizeReviewSchedule, 
  suggestStudyOptimizations,
  trackLearningProgress 
} from '../utils/learning/optimizationEngine';
import { toast } from 'sonner';

export const useStudySession = (flashcards: Array<{ front: string; back: string }>) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [studyMode, setStudyMode] = useState<'regular' | 'cram' | 'review' | 'scheduled'>('regular');
  const [queueManager, setQueueManager] = useState<ReviewQueueManager | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Load saved study progress
    const savedData = loadFromStorage();
    if (savedData.cards.length > 0) {
      console.log('Loaded saved study progress:', savedData);
    }

    const manager = new ReviewQueueManager(flashcards, {
      mode: studyMode,
      maxCards: 20,
      includeNew: true,
    });
    setQueueManager(manager);
    console.log('Initialized ReviewQueueManager with mode:', studyMode);

    // Suggest optimizations based on previous reviews
    suggestStudyOptimizations(savedData.reviews);
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
      
      // Save progress
      const savedData = loadFromStorage();
      saveToStorage({
        ...savedData,
        lastSync: new Date().toISOString()
      });
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

    const savedData = loadFromStorage();
    const currentCard = flashcards[currentCardIndex];
    
    // Calculate optimized interval
    const optimizedInterval = optimizeReviewSchedule(
      currentCard as any,
      savedData.reviews,
      1
    );

    const { nextInterval, newEaseFactor } = calculateNextReview(
      confidence,
      optimizedInterval,
      2.5,
      savedData.reviews
    );

    console.log(`Next review in ${nextInterval} days with ease factor ${newEaseFactor}`);
    
    // Track progress and save review
    const review = {
      cardId: currentCardIndex.toString(),
      lastReviewed: new Date(),
      nextReview: new Date(Date.now() + nextInterval * 24 * 60 * 60 * 1000),
      interval: nextInterval,
      easeFactor: newEaseFactor,
      consecutiveCorrect: difficulty === 'easy' ? 1 : 0,
      performance: [confidence],
      tags: [],
      metadata: {
        totalReviews: 1,
        correctReviews: difficulty === 'easy' ? 1 : 0,
        averageResponse: 0,
      },
    };

    saveToStorage({
      reviews: [...savedData.reviews, review]
    });

    trackLearningProgress(currentCard as any, [...savedData.reviews, review]);
    queueManager.markReviewed(currentCardIndex, confidence);
    handleNextCard();
  };

  return {
    currentCardIndex,
    showRating,
    handleNextCard,
    handlePrevCard,
    handleCardFlip,
    handleDifficultyRating,
    studyMode,
    setStudyMode,
    queueManager,
    isAnimating
  };
};