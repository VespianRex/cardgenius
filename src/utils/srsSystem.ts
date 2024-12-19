interface CardReview {
  cardId: string;
  lastReviewed: Date;
  nextReview: Date;
  interval: number;
  easeFactor: number;
  consecutiveCorrect: number;
}

export const calculateNextReview = (
  confidence: number,
  currentInterval: number,
  easeFactor: number
): { nextInterval: number; newEaseFactor: number } => {
  // SM-2 algorithm implementation
  const newEaseFactor = Math.max(1.3, easeFactor + (0.1 - (5 - confidence) * (0.08 + (5 - confidence) * 0.02)));
  let nextInterval = currentInterval;

  if (confidence < 3) {
    nextInterval = 1; // Reset interval if rating is too low
  } else if (currentInterval === 0) {
    nextInterval = 1;
  } else if (currentInterval === 1) {
    nextInterval = 6;
  } else {
    nextInterval = Math.round(currentInterval * newEaseFactor);
  }

  return { nextInterval, newEaseFactor };
};

export const isCardDue = (nextReview: Date): boolean => {
  return new Date() >= nextReview;
};