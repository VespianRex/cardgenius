import { StudyAnalytics } from './types';
import { SRSCard } from '../srsSystem';

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
    recommendations: []
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
  };

  return JSON.stringify(report, null, 2);
};