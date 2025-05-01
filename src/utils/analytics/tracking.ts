
export interface StudyHabit {
  timeOfDay: number;
  duration: number;
  performance: number;
  date: Date;
}

export interface StudyMetrics {
  timeOfDay: number;
  energyLevel: string;
  consecutiveCards: number;
  performance: any[];
}

export const analyzeStudyHabits = (habits: StudyHabit[]) => {
  if (!habits.length) return null;

  // Find optimal study time based on performance
  const timePerformanceMap = habits.reduce((acc: {[key: number]: number[]}, habit) => {
    const hour = habit.timeOfDay;
    if (!acc[hour]) acc[hour] = [];
    acc[hour].push(habit.performance);
    return acc;
  }, {});

  const optimalTimes = Object.entries(timePerformanceMap).map(([hour, performances]) => {
    const avgPerformance = performances.reduce((sum, val) => sum + val, 0) / performances.length;
    return { hour: parseInt(hour), avgPerformance };
  }).sort((a, b) => b.avgPerformance - a.avgPerformance);

  return {
    optimalStudyHours: optimalTimes.slice(0, 3).map(t => parseInt(t.hour)),
    studyFrequency: habits.length / 7, // average sessions per day over a week
    averageDuration: habits.reduce((sum, h) => sum + h.duration, 0) / habits.length,
    averagePerformance: habits.reduce((sum, h) => sum + h.performance, 0) / habits.length,
  };
};

// Track a study session
export const trackStudySession = (metrics: {
  duration: number;
  cardsReviewed: number; 
  performance: number;
}) => {
  const existingData = localStorage.getItem('studyAnalytics');
  const analytics = existingData ? JSON.parse(existingData) : { sessions: [] };
  
  analytics.sessions.push({
    ...metrics,
    timestamp: new Date().toISOString()
  });
  
  localStorage.setItem('studyAnalytics', JSON.stringify(analytics));
  
  return analytics;
};
