import { useState, useEffect } from 'react';
import { ReviewQueueManager } from '../utils/queueManager';
import { calculateNextReview } from '../utils/srsSystem';
import { toast } from 'sonner';

export const useStudySession = (flashcards: Array<{ front: string; back: string }>) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [studyMode, setStudyMode] = useState<'regular' | 'cram' | 'review' | 'scheduled'>('regular');
  const [queueManager, setQueueManager] = useState<ReviewQueueManager | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const manager = new ReviewQueueManager(flashcards, {
      mode: studyMode,
      maxCards: 20,
      includeNew: true,
    });
    setQueueManager(manager);
    console.log('Initialized ReviewQueueManager with mode:', studyMode);
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

    const { nextInterval, newEaseFactor } = calculateNextReview(
      confidence,
      1,
      2.5
    );

    console.log(`Next review in ${nextInterval} days with ease factor ${newEaseFactor}`);
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