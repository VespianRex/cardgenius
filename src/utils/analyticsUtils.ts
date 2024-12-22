import { toast } from 'sonner';
import { CardReview, SRSCard } from './srsSystem';

export interface StudyAnalytics {
  totalCards: number;
  cardsReviewed: number;
  correctAnswers: number;
  streak: number;
  studyTime: number;
  retentionRate: number;
  averageResponseTime: number;
  performanceByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  learningCurve: {
    date: string;
    performance: number;
  }[];
  reviewIntervals: number[];
  tags: {
    tag: string;
    performance: number;
  }[];
}

export const trackStudyProgress = (analytics: StudyAnalytics) => {
  console.log('Tracking study progress:', analytics);
  
  if (analytics.streak % 5 === 0) {
    toast.success(`🔥 ${analytics.streak} card streak! Keep going!`);
  }

  if (analytics.cardsReviewed % 10 === 0) {
    const retentionMessage = analytics.retentionRate >= 80 
      ? "Excellent retention rate!" 
      : "Keep practicing to improve retention!";
    toast.info(`📚 You've reviewed ${analytics.cardsReviewed} cards! ${retentionMessage}`);
  }

  const efficiency = (analytics.correctAnswers / analytics.cardsReviewed) * 100;
  
  return {
    ...analytics,
    efficiency,
    lastUpdated: new Date(),
  };
};

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

export const exportAnalytics = (analytics: StudyAnalytics): string => {
  const data = {
    ...analytics,
    exportDate: new Date().toISOString(),
    summary: {
      totalStudyTime: analytics.studyTime,
      averageRetention: analytics.retentionRate,
      totalCards: analytics.totalCards,
      masteryLevel: analytics.retentionRate >= 80 ? 'High' : 'Improving',
    }
  };

  return JSON.stringify(data, null, 2);
};

export const analyzePerformanceTrends = (reviews: CardReview[]): {
  trend: 'improving' | 'stable' | 'declining';
  recommendation: string;
} => {
  const recentReviews = reviews.slice(-10);
  const averagePerformance = recentReviews.reduce((sum, review) => 
    sum + (review.performance.reduce((a, b) => a + b, 0) / review.performance.length), 0
  ) / recentReviews.length;

  if (averagePerformance >= 4) {
    return {
      trend: 'improving',
      recommendation: 'Consider increasing interval lengths for better long-term retention'
    };
  } else if (averagePerformance >= 3) {
    return {
      trend: 'stable',
      recommendation: 'Maintain current study pattern'
    };
  } else {
    return {
      trend: 'declining',
      recommendation: 'Review fundamentals and decrease intervals temporarily'
    };
  }
};

export const generatePerformanceReport = (cards: SRSCard[]): string => {
  const now = new Date();
  const report = {
    timestamp: now.toISOString(),
    totalCards: cards.length,
    cardsByStatus: {
      new: cards.filter(c => c.status === 'new').length,
      learning: cards.filter(c => c.status === 'learning').length,
      review: cards.filter(c => c.status === 'review').length,
      graduated: cards.filter(c => c.status === 'graduated').length,
    },
    averageEaseFactor: cards.reduce((sum, card) => sum + card.easeFactor, 0) / cards.length,
    averageInterval: cards.reduce((sum, card) => sum + card.interval, 0) / cards.length,
  };

  return JSON.stringify(report, null, 2);
};