import { StudyAnalytics } from './types';
import { CardReview } from '../srsSystem';

export const generateStudyInsights = (analytics: StudyAnalytics) => {
  const insights = [];
  
  if (analytics.retentionRate > 80) {
    insights.push("High retention rate - consider increasing review intervals");
  } else if (analytics.retentionRate < 60) {
    insights.push("Consider reviewing cards more frequently to improve retention");
  }

  if (analytics.studyTime > 30) {
    insights.push("Consider taking a short break to maintain focus");
  }

  if (analytics.averageResponseTime > 10) {
    insights.push("Try to improve response time for better learning efficiency");
  }

  const weakestTags = analytics.tags
    .filter(t => t.performance < 70)
    .map(t => t.tag);
  
  if (weakestTags.length > 0) {
    insights.push(`Focus on improving ${weakestTags.join(', ')} topics`);
  }

  return insights;
};

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