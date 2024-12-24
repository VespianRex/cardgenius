import { calculateMaturityLevel, getNextReviewInterval } from './srs/maturityLevels';
import { analyzeLearningCurve, predictNextReviewSuccess } from './srs/learningCurve';
import { saveToStorage, loadFromStorage } from './storage/srsStorage';
import { toast } from 'sonner';

export interface CardReview {
  cardId: string;
  lastReviewed: Date;
  nextReview: Date;
  interval: number;
  easeFactor: number;
  consecutiveCorrect: number;
  performance: number[];
  tags: string[];
  metadata: {
    totalReviews: number;
    correctReviews: number;
    averageResponse: number;
  };
}

export interface SRSCard extends CardReview {
  front: string;
  back: string;
  status: 'new' | 'learning' | 'review' | 'graduated';
  preloaded?: boolean;
}

export const calculateNextReview = (
  confidence: number,
  currentInterval: number,
  easeFactor: number,
  reviews: CardReview[] = []
): { nextInterval: number; newEaseFactor: number } => {
  console.log(`Calculating next review - Confidence: ${confidence}, Current Interval: ${currentInterval}, Ease Factor: ${easeFactor}`);
  
  const maturityLevel = calculateMaturityLevel(
    reviews.length,
    easeFactor,
    currentInterval
  );

  const learningCurve = analyzeLearningCurve(reviews);
  const predictedSuccess = predictNextReviewSuccess(learningCurve, currentInterval);

  const newEaseFactor = Math.max(1.3, 
    easeFactor + (0.1 - (5 - confidence) * (0.08 + (5 - confidence) * 0.02))
  );

  const baseInterval = getNextReviewInterval(maturityLevel, currentInterval, newEaseFactor);
  const adjustedInterval = Math.round(baseInterval * (predictedSuccess > 0.9 ? 1.2 : 1));

  console.log(`Calculated next interval: ${adjustedInterval} days (base: ${baseInterval})`);
  return { nextInterval: adjustedInterval, newEaseFactor };
};

export const getCardStatus = (card: CardReview): 'new' | 'learning' | 'review' | 'graduated' => {
  if (!card.lastReviewed) return 'new';
  if (card.consecutiveCorrect < 2) return 'learning';
  if (card.consecutiveCorrect >= 5) return 'graduated';
  return 'review';
};

export const calculateRetentionScore = (reviews: CardReview[]): number => {
  if (reviews.length === 0) return 0;
  const successfulReviews = reviews.filter(r => r.consecutiveCorrect > 0);
  return (successfulReviews.length / reviews.length) * 100;
};

export const calculateOptimalReviewTime = (
  lastReviewDate: Date,
  performance: number,
  currentInterval: number
): Date => {
  const nextInterval = calculateNextReview(performance, currentInterval, 2.5).nextInterval;
  const optimalDate = new Date(lastReviewDate);
  optimalDate.setDate(optimalDate.getDate() + nextInterval);
  return optimalDate;
};

export const getPriorityScore = (card: CardReview): number => {
  const now = new Date();
  const daysOverdue = (now.getTime() - card.nextReview.getTime()) / (1000 * 60 * 60 * 24);
  const overduePenalty = Math.max(0, daysOverdue * 0.1);
  const difficultyBonus = (5 - card.easeFactor) * 0.2;
  
  return 1 + overduePenalty + difficultyBonus;
};

export const generateLearningPath = (cards: SRSCard[]): SRSCard[] => {
  return cards.sort((a, b) => {
    const priorityA = getPriorityScore(a);
    const priorityB = getPriorityScore(b);
    return priorityB - priorityA;
  });
};

export const preloadCards = async (cards: SRSCard[]): Promise<SRSCard[]> => {
  console.log('Starting card preloading...');
  
  const preloadPromises = cards.map(async (card) => {
    if (card.preloaded) return card;

    try {
      // Preload any images in the content
      const imageUrls = [...card.front.matchAll(/\bhttps?:\/\/\S+?(?:jpg|jpeg|gif|png|webp)/gi)];
      await Promise.all(
        imageUrls.map((url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = url[0];
          });
        })
      );

      return { ...card, preloaded: true };
    } catch (error) {
      console.error(`Failed to preload card ${card.cardId}:`, error);
      return card;
    }
  });

  const preloadedCards = await Promise.all(preloadPromises);
  console.log(`Preloaded ${preloadedCards.filter(c => c.preloaded).length} cards`);
  return preloadedCards;
};
