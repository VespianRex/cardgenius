import { CardReview } from '../srsSystem';

export const analyzePerformanceTrends = (reviews: CardReview[]) => {
  const recentReviews = reviews.slice(-10);
  const averagePerformance = recentReviews.reduce((sum, review) => 
    sum + (review.performance[review.performance.length - 1] || 0), 0) / recentReviews.length;

  return {
    trend: averagePerformance > 0.7 ? 'improving' : 'needs work',
    recommendation: averagePerformance > 0.7 
      ? 'Keep up the good work! Consider increasing review intervals.'
      : 'Consider reviewing cards more frequently to improve retention.'
  };
};

export const calculateRetentionRate = (reviews: CardReview[]): number => {
  if (reviews.length === 0) return 0;
  const successfulReviews = reviews.filter(r => r.consecutiveCorrect > 0);
  return (successfulReviews.length / reviews.length) * 100;
};