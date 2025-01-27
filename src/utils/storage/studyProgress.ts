import { toast } from "sonner";

export interface StudyProgress {
  lastStudyDate: string;
  cardsReviewed: number;
  correctAnswers: number;
  streak: number;
  totalStudyTime: number;
  cardStats: {
    [cardId: string]: {
      lastReviewed: string;
      nextReview: string;
      difficulty: number;
      consecutiveCorrect: number;
    };
  };
}

const STORAGE_KEY = 'study_progress';

export const saveProgress = (progress: Partial<StudyProgress>) => {
  try {
    const currentProgress = loadProgress();
    const updatedProgress = {
      ...currentProgress,
      ...progress,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
    console.log('Progress saved:', updatedProgress);
  } catch (error) {
    console.error('Error saving progress:', error);
    toast.error('Failed to save progress');
  }
};

export const loadProgress = (): StudyProgress => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return {
        lastStudyDate: new Date().toISOString(),
        cardsReviewed: 0,
        correctAnswers: 0,
        streak: 0,
        totalStudyTime: 0,
        cardStats: {}
      };
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading progress:', error);
    toast.error('Failed to load progress');
    return {
      lastStudyDate: new Date().toISOString(),
      cardsReviewed: 0,
      correctAnswers: 0,
      streak: 0,
      totalStudyTime: 0,
      cardStats: {}
    };
  }
};

export const updateCardProgress = (
  cardId: string,
  isCorrect: boolean,
  difficulty: number
) => {
  const progress = loadProgress();
  const now = new Date();
  const nextReview = calculateNextReview(difficulty);

  progress.cardStats[cardId] = {
    lastReviewed: now.toISOString(),
    nextReview: nextReview.toISOString(),
    difficulty,
    consecutiveCorrect: isCorrect 
      ? (progress.cardStats[cardId]?.consecutiveCorrect || 0) + 1
      : 0
  };

  progress.cardsReviewed++;
  if (isCorrect) progress.correctAnswers++;

  saveProgress(progress);
  return nextReview;
};

const calculateNextReview = (difficulty: number): Date => {
  const now = new Date();
  const baseInterval = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const multiplier = Math.pow(2, 4 - difficulty); // 2^(4-difficulty)
  
  return new Date(now.getTime() + (baseInterval * multiplier));
};