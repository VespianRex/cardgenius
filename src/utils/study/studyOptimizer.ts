
import { StudyMetrics } from "../analytics/tracking";

export const getOptimalBatchSize = (metrics: StudyMetrics): number => {
  // Base batch size
  let baseSize = 10;
  
  // Adjust based on energy level
  if (metrics.energyLevel === 'high') baseSize += 5;
  if (metrics.energyLevel === 'low') baseSize -= 5;
  
  // Adjust based on time of day (peak hours are 9-11 AM and 4-6 PM)
  const hour = metrics.timeOfDay;
  if ((hour >= 9 && hour <= 11) || (hour >= 16 && hour <= 18)) {
    baseSize += 2; // Slight boost during peak cognitive hours
  }
  
  // Ensure batch size is within reasonable bounds
  return Math.max(5, Math.min(baseSize, 20));
};

export const suggestBreakTime = (studyMinutes: number): boolean => {
  // Implement pomodoro-like technique: suggest a break after 25 minutes
  if (studyMinutes > 0 && studyMinutes % 25 === 0) {
    return true;
  }
  
  return false;
};

export const calculateStudyEfficiency = (metrics: {
  startTime: Date;
  endTime: Date;
  cardsReviewed: number;
  correctAnswers: number;
}): number => {
  // Calculate study duration in minutes
  const durationMinutes = (metrics.endTime.getTime() - metrics.startTime.getTime()) / (1000 * 60);
  
  // Calculate cards per minute
  const cardsPerMinute = metrics.cardsReviewed / durationMinutes;
  
  // Calculate accuracy
  const accuracy = metrics.correctAnswers / metrics.cardsReviewed;
  
  // Combine metrics (weighted formula)
  return (cardsPerMinute * 0.6) + (accuracy * 0.4 * 10);
};
