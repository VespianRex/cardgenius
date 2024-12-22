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
  studyHabits: {
    preferredTime: string;
    averageSessionDuration: number;
    consistencyScore: number;
  };
  personalGoals: {
    daily: { target: number; achieved: number };
    weekly: { target: number; achieved: number };
    monthly: { target: number; achieved: number };
  };
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

export const analyzeStudyHabits = (sessions: any[]): void => {
  const timeDistribution = sessions.reduce((acc, session) => {
    const hour = new Date(session.date).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  const preferredHour = Object.entries(timeDistribution)
    .sort(([, a], [, b]) => (b as number) - (a as number))[0][0];

  toast.info(`Your most productive study time appears to be around ${preferredHour}:00`);
};

export const generateDetailedReport = (analytics: StudyAnalytics): string => {
  const report = {
    overview: {
      totalStudyTime: analytics.studyTime,
      totalCardsReviewed: analytics.cardsReviewed,
      averageRetention: analytics.retentionRate,
      streak: analytics.streak
    },
    performance: {
      byDifficulty: analytics.performanceByDifficulty,
      learningCurve: analytics.learningCurve,
      responseTime: analytics.averageResponseTime
    },
    habits: analytics.studyHabits,
    goals: analytics.personalGoals,
    recommendations: generateStudyInsights(analytics)
  };

  return JSON.stringify(report, null, 2);
};

export const exportAnalyticsCSV = (analytics: StudyAnalytics): string => {
  const headers = [
    'Date',
    'Cards Reviewed',
    'Retention Rate',
    'Study Time',
    'Average Response Time',
    'Easy Cards',
    'Medium Cards',
    'Hard Cards'
  ].join(',');

  const data = [
    new Date().toISOString(),
    analytics.cardsReviewed,
    analytics.retentionRate,
    analytics.studyTime,
    analytics.averageResponseTime,
    analytics.performanceByDifficulty.easy,
    analytics.performanceByDifficulty.medium,
    analytics.performanceByDifficulty.hard
  ].join(',');

  return `${headers}\n${data}`;
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
    learningProgress: calculateLearningProgress(cards),
    recommendations: generateRecommendations(cards)
  };

  return JSON.stringify(report, null, 2);
};

const calculateLearningProgress = (cards: SRSCard[]): number => {
  const totalWeight = cards.length * 100;
  const currentProgress = cards.reduce((sum, card) => {
    switch (card.status) {
      case 'graduated': return sum + 100;
      case 'review': return sum + 75;
      case 'learning': return sum + 25;
      default: return sum;
    }
  }, 0);

  return (currentProgress / totalWeight) * 100;
};

const generateRecommendations = (cards: SRSCard[]): string[] => {
  const recommendations = [];
  const strugglingCards = cards.filter(c => c.metadata.correctReviews / c.metadata.totalReviews < 0.6);
  
  if (strugglingCards.length > 0) {
    recommendations.push('Consider reviewing these challenging cards more frequently');
  }

  const longIntervalCards = cards.filter(c => c.interval > 30);
  if (longIntervalCards.length > 0) {
    recommendations.push('Some cards have very long intervals. Consider a quick review');
  }

  return recommendations;
};
