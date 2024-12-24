import { CardReview } from '../srsSystem';

export interface LearningPoint {
  date: string;
  successRate: number;
  averageInterval: number;
  totalReviews: number;
}

export const analyzeLearningCurve = (reviews: CardReview[]): LearningPoint[] => {
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(a.lastReviewed).getTime() - new Date(b.lastReviewed).getTime()
  );

  const points: LearningPoint[] = [];
  let runningTotal = 0;
  let successfulReviews = 0;

  sortedReviews.forEach((review, index) => {
    const date = new Date(review.lastReviewed).toISOString().split('T')[0];
    runningTotal++;
    
    if (review.consecutiveCorrect > 0) {
      successfulReviews++;
    }

    if ((index + 1) % 10 === 0 || index === sortedReviews.length - 1) {
      points.push({
        date,
        successRate: (successfulReviews / runningTotal) * 100,
        averageInterval: sortedReviews
          .slice(0, index + 1)
          .reduce((sum, r) => sum + r.interval, 0) / (index + 1),
        totalReviews: runningTotal
      });
    }
  });

  console.log('Generated learning curve points:', points);
  return points;
};

export const predictNextReviewSuccess = (
  learningCurve: LearningPoint[],
  currentInterval: number
): number => {
  if (learningCurve.length === 0) return 0.5;

  const recentPoints = learningCurve.slice(-5);
  const averageSuccessRate = recentPoints.reduce(
    (sum, point) => sum + point.successRate,
    0
  ) / recentPoints.length;

  const successProbability = averageSuccessRate / 100 * 
    Math.exp(-currentInterval / (recentPoints[recentPoints.length - 1].averageInterval * 2));

  console.log(`Predicted success probability: ${successProbability}`);
  return Math.min(1, Math.max(0, successProbability));
};