import { StudyAnalytics } from './types';

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

export const analyzeStudyHabits = (sessions: any[]): string => {
  const timeDistribution = sessions.reduce((acc, session) => {
    const hour = new Date(session.date).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const preferredHour = Object.entries(timeDistribution)
    .sort(([, a], [, b]) => b - a)[0][0];

  return `Your most productive study time appears to be around ${preferredHour}:00`;
};