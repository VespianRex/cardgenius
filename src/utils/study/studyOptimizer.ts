import { toast } from 'sonner';
import { SRSCard } from '../srsSystem';

interface StudyMetrics {
  timeOfDay: number;
  energyLevel: 'high' | 'medium' | 'low';
  consecutiveCards: number;
  performance: number[];
}

export const getOptimalBatchSize = (metrics: StudyMetrics): number => {
  const baseSize = 20;
  
  // Adjust based on energy level
  const energyMultiplier = {
    high: 1.2,
    medium: 1,
    low: 0.8
  }[metrics.energyLevel];

  // Adjust based on time of day (cognitive performance peaks)
  const hour = metrics.timeOfDay;
  const timeMultiplier = 
    (hour >= 9 && hour <= 11) || (hour >= 15 && hour <= 17) ? 1.2 : // Peak hours
    (hour >= 23 || hour <= 5) ? 0.7 : // Late night
    1;

  return Math.round(baseSize * energyMultiplier * timeMultiplier);
};

export const suggestBreakTime = (consecutiveStudyMinutes: number): boolean => {
  // Suggest break after 25 minutes (Pomodoro-inspired)
  if (consecutiveStudyMinutes >= 25) {
    toast.info("Time for a 5-minute break! 🎯", {
      description: "Taking breaks improves retention and focus."
    });
    return true;
  }
  return false;
};

export const analyzeStudyHabits = (sessions: { date: Date; performance: number[] }[]) => {
  const timeDistribution = new Array(24).fill(0);
  const performanceByHour = new Array(24).fill({ sum: 0, count: 0 });

  sessions.forEach(session => {
    const hour = session.date.getHours();
    timeDistribution[hour]++;
    
    const avgPerformance = session.performance.reduce((a, b) => a + b, 0) / session.performance.length;
    performanceByHour[hour] = {
      sum: performanceByHour[hour].sum + avgPerformance,
      count: performanceByHour[hour].count + 1
    };
  });

  // Find optimal study times
  const bestHours = performanceByHour
    .map((perf, hour) => ({
      hour,
      avgPerformance: perf.count > 0 ? perf.sum / perf.count : 0
    }))
    .sort((a, b) => b.avgPerformance - a.avgPerformance)
    .slice(0, 3);

  return {
    bestStudyHours: bestHours.map(h => h.hour),
    mostFrequentHours: timeDistribution
      .map((count, hour) => ({ hour, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map(h => h.hour)
  };
};

export const suggestRelatedCards = (currentCard: SRSCard, allCards: SRSCard[]): SRSCard[] => {
  // Simple tag-based relationship for now
  return allCards.filter(card => 
    card.cardId !== currentCard.cardId && 
    card.tags.some(tag => currentCard.tags.includes(tag))
  ).slice(0, 3);
};