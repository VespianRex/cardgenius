import { useState } from 'react';
import { trackStudyProgress, generateStudyInsights } from '../utils/analyticsUtils';
import { toast } from 'sonner';

export const useStudyAnalytics = () => {
  const [startTime] = useState(new Date());
  const [ratings, setRatings] = useState({ easy: 0, medium: 0, hard: 0 });
  const [streak, setStreak] = useState(0);
  const [analytics, setAnalytics] = useState({
    totalCards: 0,
    cardsReviewed: 0,
    correctAnswers: 0,
    streak: 0,
    studyTime: 0,
    retentionRate: 0,
  });

  const updateAnalytics = (difficulty: 'easy' | 'medium' | 'hard', confidence: number) => {
    setRatings(prev => ({
      ...prev,
      [difficulty]: prev[difficulty] + 1
    }));

    const newAnalytics = {
      ...analytics,
      cardsReviewed: analytics.cardsReviewed + 1,
      correctAnswers: difficulty === 'easy' ? analytics.correctAnswers + 1 : analytics.correctAnswers,
      streak: difficulty === 'easy' ? analytics.streak + 1 : 0,
      studyTime: Math.floor((new Date().getTime() - startTime.getTime()) / 60000),
      retentionRate: ((analytics.correctAnswers + (difficulty === 'easy' ? 1 : 0)) / (analytics.cardsReviewed + 1)) * 100,
    };

    setAnalytics(newAnalytics);
    trackStudyProgress(newAnalytics);

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
  };

  return {
    analytics,
    streak,
    startTime,
    ratings,
    updateAnalytics
  };
};