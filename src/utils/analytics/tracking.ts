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

interface StudySession {
  date: Date;
}

export const analyzeStudyHabits = (sessions: StudySession[]): void => {
  // Initialize timeDistribution as a number-only record
  const timeDistribution: Record<number, number> = {};

  // Populate the distribution
  sessions.forEach(session => {
    const hour = session.date.getHours();
    timeDistribution[hour] = (timeDistribution[hour] || 0) + 1;
  });

  // Find the hour with the most sessions
  const entries = Object.entries(timeDistribution);
  if (entries.length === 0) {
    return;
  }

  const [preferredHour] = entries.reduce((max, current) => {
    return current[1] > max[1] ? current : max;
  });

  toast.info(`Your most productive study time appears to be around ${preferredHour}:00`);
};