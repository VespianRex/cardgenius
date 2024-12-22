import { toast } from 'sonner';

export interface MemoryTechnique {
  name: string;
  description: string;
  example: string;
}

export const memoryTechniques: MemoryTechnique[] = [
  {
    name: 'Mind Palace',
    description: 'Associate information with specific locations in a familiar place',
    example: 'Visualize walking through your home, placing each concept in a different room'
  },
  {
    name: 'Chunking',
    description: 'Break information into smaller, manageable chunks',
    example: 'Breaking a phone number into area code, prefix, and line number'
  },
  {
    name: 'Mnemonics',
    description: 'Create memorable phrases or acronyms',
    example: 'ROY G. BIV for colors of the rainbow'
  }
];

export const suggestMemoryTechnique = (cardContent: string): MemoryTechnique => {
  // Simple algorithm to suggest technique based on content length and type
  if (cardContent.length > 100) {
    return memoryTechniques[1]; // Chunking
  } else if (cardContent.includes(',') || cardContent.includes(';')) {
    return memoryTechniques[2]; // Mnemonics
  }
  return memoryTechniques[0]; // Mind Palace
};

export const trackStudyHabit = (studyDuration: number, cardsReviewed: number) => {
  const efficiency = cardsReviewed / (studyDuration / 60); // cards per minute
  localStorage.setItem('lastStudySession', JSON.stringify({
    date: new Date().toISOString(),
    duration: studyDuration,
    cardsReviewed,
    efficiency
  }));
};

export const getStudyStreak = (): number => {
  const streak = parseInt(localStorage.getItem('studyStreak') || '0');
  const lastStudy = localStorage.getItem('lastStudySession');
  
  if (!lastStudy) return 0;
  
  const lastStudyDate = new Date(JSON.parse(lastStudy).date);
  const today = new Date();
  const diffDays = Math.floor((today.getTime() - lastStudyDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return diffDays <= 1 ? streak : 0;
};