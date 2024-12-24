import { SRSCard, CardReview } from '../srsSystem';

export interface SRSStorageData {
  cards: SRSCard[];
  reviews: CardReview[];
  lastSync: string;
}

export const storageKey = 'srs_data';

export const saveToStorage = (data: SRSStorageData) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
    console.log('SRS data saved to storage:', data);
  } catch (error) {
    console.error('Error saving SRS data:', error);
  }
};

export const loadFromStorage = (): SRSStorageData | null => {
  try {
    const data = localStorage.getItem(storageKey);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading SRS data:', error);
    return null;
  }
};