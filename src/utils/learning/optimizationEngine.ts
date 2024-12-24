import { CardReview, SRSCard } from '../srsSystem';
import { toast } from 'sonner';

interface LearningMetrics {
  retentionRate: number;
  averageInterval: number;
  optimalTime: number;
  difficulty: number;
}

export const calculateLearningMetrics = (reviews: CardReview[]): LearningMetrics => {
  if (!reviews.length) {
    return {
      retentionRate: 0,
      averageInterval: 1,
      optimalTime: 24,
      difficulty: 2.5
    };
  }

  const correctReviews = reviews.filter(r => r.consecutiveCorrect > 0).length;
  const retentionRate = (correctReviews / reviews.length) * 100;
  const averageInterval = reviews.reduce((sum, r) => sum + r.interval, 0) / reviews.length;
  
  // Calculate optimal review time based on performance
  const optimalTime = Math.max(
    24,
    averageInterval * (retentionRate > 85 ? 1.2 : retentionRate > 70 ? 1 : 0.8)
  );

  // Adjust difficulty based on performance
  const difficulty = reviews.reduce((sum, r) => sum + r.easeFactor, 0) / reviews.length;

  return {
    retentionRate,
    averageInterval,
    optimalTime,
    difficulty
  };
};

export const optimizeReviewSchedule = (
  card: SRSCard,
  reviews: CardReview[],
  currentInterval: number
): number => {
  const metrics = calculateLearningMetrics(reviews);
  
  // Adjust interval based on retention rate and current performance
  let optimizedInterval = currentInterval;
  
  if (metrics.retentionRate > 85) {
    optimizedInterval *= 1.2; // Increase interval if performing well
    console.log(`Increasing interval for card ${card.cardId} due to high retention`);
  } else if (metrics.retentionRate < 70) {
    optimizedInterval *= 0.8; // Decrease interval if struggling
    console.log(`Decreasing interval for card ${card.cardId} due to low retention`);
  }

  // Apply time-of-day optimization
  const hour = new Date().getHours();
  if (hour >= 9 && hour <= 11) {
    optimizedInterval *= 1.1; // Morning study bonus
  }

  // Ensure minimum and maximum intervals
  optimizedInterval = Math.max(1, Math.min(optimizedInterval, 365));

  return Math.round(optimizedInterval);
};

export const suggestStudyOptimizations = (reviews: CardReview[]): void => {
  const metrics = calculateLearningMetrics(reviews);
  
  if (metrics.retentionRate < 70) {
    toast.info('Consider shorter study sessions with more frequent reviews');
  }
  
  if (metrics.averageInterval > 30 && metrics.retentionRate < 80) {
    toast.info('Your review intervals might be too long. Try reviewing cards more frequently');
  }

  const hour = new Date().getHours();
  if (hour >= 22 || hour < 6) {
    toast.info('Studies show better retention when studying during daylight hours');
  }
};

export const trackLearningProgress = (card: SRSCard, reviews: CardReview[]): void => {
  const metrics = calculateLearningMetrics(reviews);
  console.log(`Learning metrics for card ${card.cardId}:`, metrics);
  
  // Provide feedback based on progress
  if (metrics.retentionRate > 85 && reviews.length >= 5) {
    toast.success('Great progress! Your retention rate is excellent');
  }
};