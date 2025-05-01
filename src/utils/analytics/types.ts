
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
  learningCurve: Array<{
    date: string;
    performance: number;
  }>;
  reviewIntervals: number[];
  tags: Array<{
    tag: string;
    performance: number;
  }>;
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
