
import { CardReview, SRSCard } from '../srsSystem';
import { analyzeLearningCurve } from './learningCurve';

interface ReviewScheduleParams {
  performance: number;
  previousInterval: number;
  correctStreak: number;
  timeOfDay: number;
  lastReviewTime?: Date;
}

export const calculateOptimalInterval = ({
  performance,
  previousInterval,
  correctStreak,
  timeOfDay,
  lastReviewTime,
}: ReviewScheduleParams): number => {
  // Base interval calculation
  let interval = previousInterval * (1 + (performance - 3) * 0.3);
  
  // Adjust based on streak
  if (correctStreak > 3) {
    interval *= 1 + (correctStreak * 0.1);
  }
  
  // Time of day optimization (people tend to remember better in the morning)
  const timeMultiplier = timeOfDay >= 5 && timeOfDay <= 10 ? 1.1 : 1.0;
  interval *= timeMultiplier;
  
  // Ensure minimum and maximum intervals
  interval = Math.max(1, Math.min(interval, 365));
  
  return Math.round(interval);
};

export const optimizeReviewSchedule = (
  cards: SRSCard[],
  reviews: CardReview[],
  maxCardsPerDay: number = 20
): SRSCard[] => {
  const now = new Date();
  const learningCurve = analyzeLearningCurve(reviews);
  
  return cards
    .map(card => {
      const cardReviews = reviews.filter(r => r.cardId === card.cardId);
      const timeOfDay = now.getHours();
      
      const optimizedInterval = calculateOptimalInterval({
        performance: cardReviews.length > 0 ? 
          cardReviews[cardReviews.length - 1].performance[0] : 3,
        previousInterval: card.interval || 1,
        correctStreak: card.consecutiveCorrect,
        timeOfDay,
        lastReviewTime: card.lastReviewed ? new Date(card.lastReviewed) : undefined
      });
      
      return {
        ...card,
        interval: optimizedInterval,
        nextReview: new Date(now.getTime() + optimizedInterval * 24 * 60 * 60 * 1000)
      };
    })
    .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime())
    .slice(0, maxCardsPerDay);
};

export const getMaturityLevel = (card: SRSCard): number => {
  const baseMaturity = Math.min(card.consecutiveCorrect * 0.2, 1);
  const intervalFactor = Math.min(card.interval / 30, 1); // Max out at 30 days
  
  return (baseMaturity + intervalFactor) / 2;
};
