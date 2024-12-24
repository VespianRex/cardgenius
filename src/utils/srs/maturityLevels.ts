export type MaturityLevel = 'new' | 'learning' | 'reviewing' | 'mature';

export interface MaturityThresholds {
  reviewing: number;
  mature: number;
}

const defaultThresholds: MaturityThresholds = {
  reviewing: 3,
  mature: 7
};

export const calculateMaturityLevel = (
  successfulReviews: number,
  averageEase: number,
  daysSinceFirstReview: number
): MaturityLevel => {
  console.log(`Calculating maturity: ${successfulReviews} successful reviews, ${averageEase} ease, ${daysSinceFirstReview} days`);
  
  if (successfulReviews === 0) return 'new';
  if (successfulReviews < defaultThresholds.reviewing) return 'learning';
  if (successfulReviews < defaultThresholds.mature) return 'reviewing';
  return 'mature';
};

export const getNextReviewInterval = (
  maturityLevel: MaturityLevel,
  currentInterval: number,
  easeFactor: number
): number => {
  switch (maturityLevel) {
    case 'new':
      return 1;
    case 'learning':
      return Math.max(1, Math.ceil(currentInterval * 1.5));
    case 'reviewing':
      return Math.max(1, Math.ceil(currentInterval * easeFactor));
    case 'mature':
      return Math.max(1, Math.ceil(currentInterval * easeFactor * 1.2));
    default:
      return currentInterval;
  }
};