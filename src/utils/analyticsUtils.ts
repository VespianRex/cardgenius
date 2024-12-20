import { toast } from 'sonner';

interface StudyAnalytics {
  totalCards: number;
  cardsReviewed: number;
  correctAnswers: number;
  streak: number;
  studyTime: number;
  retentionRate: number;
}

export const trackStudyProgress = (analytics: StudyAnalytics) => {
  console.log('Tracking study progress:', analytics);
  
  // Track milestones and show motivational messages
  if (analytics.streak % 5 === 0) {
    toast.success(`🔥 ${analytics.streak} card streak! Keep going!`);
  }

  if (analytics.cardsReviewed % 10 === 0) {
    const retentionMessage = analytics.retentionRate >= 80 
      ? "Excellent retention rate!" 
      : "Keep practicing to improve retention!";
    toast.info(`📚 You've reviewed ${analytics.cardsReviewed} cards! ${retentionMessage}`);
  }

  // Calculate and track study efficiency
  const efficiency = (analytics.correctAnswers / analytics.cardsReviewed) * 100;
  console.log(`Study efficiency: ${efficiency.toFixed(1)}%`);

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

  return insights;
};