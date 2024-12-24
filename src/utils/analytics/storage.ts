import { StudyAnalytics } from './types';

export const saveAnalytics = (analytics: StudyAnalytics) => {
  try {
    localStorage.setItem('study_analytics', JSON.stringify(analytics));
    console.log('Analytics saved:', analytics);
  } catch (error) {
    console.error('Error saving analytics:', error);
  }
};

export const loadAnalytics = (): StudyAnalytics | null => {
  try {
    const data = localStorage.getItem('study_analytics');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading analytics:', error);
    return null;
  }
};