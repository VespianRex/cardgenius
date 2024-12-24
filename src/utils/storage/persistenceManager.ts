import { toast } from 'sonner';
import { SRSCard, CardReview } from '../srsSystem';

export interface StorageData {
  cards: SRSCard[];
  reviews: CardReview[];
  lastSync: string;
  studyStats: {
    totalReviews: number;
    correctReviews: number;
    averageResponse: number;
    lastStudyDate: string;
    streak: number;
  };
}

const STORAGE_KEY = 'srs_study_data';

export const saveToStorage = (data: Partial<StorageData>) => {
  try {
    const existingData = loadFromStorage();
    const updatedData = {
      ...existingData,
      ...data,
      lastSync: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    console.log('Data saved to storage:', updatedData);
  } catch (error) {
    console.error('Error saving data:', error);
    toast.error('Failed to save study progress');
  }
};

export const loadFromStorage = (): StorageData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return {
        cards: [],
        reviews: [],
        lastSync: new Date().toISOString(),
        studyStats: {
          totalReviews: 0,
          correctReviews: 0,
          averageResponse: 0,
          lastStudyDate: new Date().toISOString(),
          streak: 0
        }
      };
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading data:', error);
    toast.error('Failed to load study data');
    return {
      cards: [],
      reviews: [],
      lastSync: new Date().toISOString(),
      studyStats: {
        totalReviews: 0,
        correctReviews: 0,
        averageResponse: 0,
        lastStudyDate: new Date().toISOString(),
        streak: 0
      }
    };
  }
};

export const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Storage cleared');
    toast.success('Study data cleared successfully');
  } catch (error) {
    console.error('Error clearing storage:', error);
    toast.error('Failed to clear study data');
  }
};