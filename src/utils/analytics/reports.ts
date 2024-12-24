import { StudyAnalytics } from './types';
import { SRSCard } from '../srsSystem';
import { generateStudyInsights } from './insights';

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
  const report = {
    timestamp: new Date().toISOString(),
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
  const strugglingCards = cards.filter(c => 
    c.metadata.correctReviews / c.metadata.totalReviews < 0.6
  );
  
  if (strugglingCards.length > 0) {
    recommendations.push('Consider reviewing these challenging cards more frequently');
  }

  const longIntervalCards = cards.filter(c => c.interval > 30);
  if (longIntervalCards.length > 0) {
    recommendations.push('Some cards have very long intervals. Consider a quick review');
  }

  return recommendations;
};