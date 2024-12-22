import { StudyAnalytics } from './types';
import { toast } from 'sonner';

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

export const analyzeStudyHabits = (sessions: any[]): void => {
  const timeDistribution = sessions.reduce((acc, session) => {
    const hour = new Date(session.date).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const preferredHour = Object.entries(timeDistribution)
    .sort(([, a], [, b]) => b - a)[0][0];

  toast.info(`Your most productive study time appears to be around ${preferredHour}:00`);
};