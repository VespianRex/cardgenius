
import { CardReview, SRSCard } from '../srsSystem';
import { toast } from 'sonner';

interface StudyMetrics {
  timeOfDay: number;  // Hour of day (0-23)
  energyLevel: 'high' | 'medium' | 'low';
  consecutiveCards: number;
  performance: number[];  // Recent performance scores
}

export const getOptimalBatchSize = (metrics: StudyMetrics): number => {
  // Base batch size
  let batchSize = 20;

  // Adjust for time of day
  const hour = metrics.timeOfDay;
  if (hour >= 5 && hour <= 10) { // Morning
    batchSize += 5; // People generally have better focus in the morning
  } else if (hour >= 14 && hour <= 16) { // Post-lunch dip
    batchSize -= 5;
  }

  // Adjust for energy level
  switch (metrics.energyLevel) {
    case 'high':
      batchSize += 5;
      break;
    case 'low':
      batchSize -= 10;
      break;
    default:
      break;
  }

  // Adjust for recent performance
  if (metrics.performance.length > 0) {
    const avgPerformance = metrics.performance.reduce((a, b) => a + b) / metrics.performance.length;
    if (avgPerformance > 4) {
      batchSize += 5;
    } else if (avgPerformance < 3) {
      batchSize -= 5;
    }
  }

  // Prevent study fatigue
  if (metrics.consecutiveCards > 50) {
    batchSize = Math.max(5, batchSize - 10);
  }

  // Ensure reasonable limits
  return Math.max(5, Math.min(30, batchSize));
};

export const suggestBreakTime = (studyDurationMinutes: number): boolean => {
  // Suggest breaks based on study duration
  if (studyDurationMinutes >= 25) {
    return studyDurationMinutes % 25 === 0; // Pomodoro-style breaks
  }
  return false;
};

export const calculateLearningMetrics = (reviews: CardReview[]) => {
  if (reviews.length === 0) {
    return {
      retentionRate: 0,
      averageInterval: 0,
      totalReviews: 0,
    };
  }

  const correctReviews = reviews.filter(r => r.consecutiveCorrect > 0).length;
  const retentionRate = (correctReviews / reviews.length) * 100;
  const averageInterval = reviews.reduce((sum, r) => sum + r.interval, 0) / reviews.length;

  return {
    retentionRate,
    averageInterval,
    totalReviews: reviews.length,
  };
};

export const trackLearningProgress = (card: SRSCard, reviews: CardReview[]) => {
  const metrics = calculateLearningMetrics(reviews);

  // Provide feedback based on learning progress
  if (metrics.retentionRate < 70 && metrics.totalReviews > 10) {
    toast.info("Tip: Try using mnemonics or breaking down complex cards", {
      id: "learning-tip",
    });
  }

  // Log learning progress for analysis
  console.log('Learning progress:', {
    cardId: card.cardId,
    metrics,
    timestamp: new Date().toISOString(),
  });

  return metrics;
};

export const suggestStudyOptimizations = (reviews: CardReview[]) => {
  const metrics = calculateLearningMetrics(reviews);
  const now = new Date();
  const hour = now.getHours();

  // Suggest optimal study times
  if (metrics.totalReviews > 0) {
    if (hour >= 23 || hour <= 5) {
      toast.info("Your retention might be better during daytime hours", {
        id: "study-time-tip",
      });
    }

    // Suggest interval adjustments based on performance
    if (metrics.retentionRate > 90 && metrics.averageInterval < 7) {
      toast.success("You're doing great! We'll increase intervals to optimize your learning", {
        id: "interval-tip",
      });
    }
  }
};
