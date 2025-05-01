import { useState, useEffect } from 'react';
import { 
  StudyAnalytics, 
  trackStudyProgress, 
  generateStudyInsights, 
  analyzePerformanceTrends,
  exportAnalyticsCSV,
  generateDetailedReport 
} from '../utils/analytics';
import { CardReview } from '../utils/srsSystem';
import { toast } from 'sonner';

export const useStudyAnalytics = () => {
  const [startTime] = useState(new Date());
  const [ratings, setRatings] = useState({ easy: 0, medium: 0, hard: 0 });
  const [streak, setStreak] = useState(0);
  const [reviews, setReviews] = useState<CardReview[]>([]);
  const [analytics, setAnalytics] = useState<StudyAnalytics>({
    totalCards: 0,
    cardsReviewed: 0,
    correctAnswers: 0,
    streak: 0,
    studyTime: 0,
    retentionRate: 0,
    averageResponseTime: 0,
    performanceByDifficulty: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
    learningCurve: [],
    reviewIntervals: [],
    tags: [],
    studyHabits: {
      preferredTime: '',
      averageSessionDuration: 0,
      consistencyScore: 0,
    },
    personalGoals: {
      daily: { target: 0, achieved: 0 },
      weekly: { target: 0, achieved: 0 },
      monthly: { target: 0, achieved: 0 },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        studyTime: Math.floor((new Date().getTime() - startTime.getTime()) / 60000)
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, [startTime]);

  const updateAnalytics = (difficulty: 'easy' | 'medium' | 'hard', confidence: number, responseTime: number) => {
    setRatings(prev => ({
      ...prev,
      [difficulty]: prev[difficulty] + 1
    }));

    const newReview: CardReview = {
      cardId: Date.now().toString(),
      lastReviewed: new Date(),
      nextReview: new Date(),
      interval: 0,
      easeFactor: 2.5,
      consecutiveCorrect: difficulty === 'easy' ? 1 : 0,
      performance: [confidence],
      tags: [],
      metadata: {
        totalReviews: 1,
        correctReviews: difficulty === 'easy' ? 1 : 0,
        averageResponse: responseTime,
      },
    };

    setReviews(prev => [...prev, newReview]);

    const newAnalytics: StudyAnalytics = {
      ...analytics,
      cardsReviewed: analytics.cardsReviewed + 1,
      correctAnswers: difficulty === 'easy' ? analytics.correctAnswers + 1 : analytics.correctAnswers,
      streak: difficulty === 'easy' ? analytics.streak + 1 : 0,
      studyTime: Math.floor((new Date().getTime() - startTime.getTime()) / 60000),
      retentionRate: ((analytics.correctAnswers + (difficulty === 'easy' ? 1 : 0)) / (analytics.cardsReviewed + 1)) * 100,
      averageResponseTime: (analytics.averageResponseTime * analytics.cardsReviewed + responseTime) / (analytics.cardsReviewed + 1),
      performanceByDifficulty: {
        ...analytics.performanceByDifficulty,
        [difficulty]: analytics.performanceByDifficulty[difficulty] + 1
      },
    };

    setAnalytics(newAnalytics);
    const trackedAnalytics = trackStudyProgress(newAnalytics);
    
    if (difficulty === 'easy' && confidence >= 4) {
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak % 5 === 0) {
          toast.success(`🔥 ${newStreak} card streak! Keep it up!`);
        }
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    const insights = generateStudyInsights(newAnalytics);
    insights.forEach(insight => toast.info(insight));

    const performanceTrend = analyzePerformanceTrends(reviews);
    if (reviews.length % 10 === 0) {
      toast.info(`Study Trend: ${performanceTrend.recommendation}`);
    }
  };

  const exportAnalytics = () => {
    const report = {
      ...analytics,
      exportDate: new Date().toISOString(),
      totalStudyTime: Math.floor((new Date().getTime() - startTime.getTime()) / 60000),
      averagePerformance: (analytics.correctAnswers / analytics.cardsReviewed) * 100 || 0,
    };
    
    // Create a Blob with the JSON data
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `study-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Analytics exported successfully!');
  };

  return {
    analytics,
    streak,
    startTime,
    ratings,
    reviews,
    updateAnalytics,
    exportAnalytics
  };
};
