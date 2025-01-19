import { SRSCard } from './srsSystem';
import { calculateLearningMetrics } from './learning/optimizationEngine';
import { toast } from 'sonner';

interface QueueOptions {
  mode: 'regular' | 'cram' | 'review' | 'scheduled';
  maxCards?: number;
  includeNew?: boolean;
}

export class ReviewQueueManager {
  private queue: number[] = [];
  private reviewed: Set<number> = new Set();
  private sessionMetrics = {
    correctStreak: 0,
    totalReviewed: 0,
    startTime: new Date(),
  };
  
  constructor(private cards: SRSCard[], private options: QueueOptions) {
    console.log('Initializing ReviewQueueManager with options:', options);
    this.initializeQueue();
  }

  private initializeQueue() {
    const { mode, maxCards = Infinity, includeNew = true } = this.options;
    console.log(`Initializing queue for mode: ${mode}`);

    // Get due cards first
    const dueCards = this.cards
      .map((_, index) => index)
      .filter(index => this.isDue(index))
      .sort((a, b) => this.getPriority(b) - this.getPriority(a));

    // Add new cards if needed and allowed
    const newCards = includeNew 
      ? this.cards
          .map((_, index) => index)
          .filter(index => !this.reviewed.has(index) && !dueCards.includes(index))
          .slice(0, Math.max(0, maxCards - dueCards.length))
      : [];

    switch (mode) {
      case 'review':
        this.queue = dueCards;
        break;
      case 'cram':
        this.queue = [...Array(this.cards.length)].map((_, i) => i);
        break;
      case 'scheduled':
        this.queue = dueCards.slice(0, maxCards);
        break;
      default: // regular mode
        this.queue = [...dueCards, ...newCards];
    }

    console.log(`Queue initialized with ${this.queue.length} cards`);
  }

  private isDue(index: number): boolean {
    const card = this.cards[index];
    if (!card.nextReview) return true;
    return new Date() >= new Date(card.nextReview);
  }

  private getPriority(index: number): number {
    const card = this.cards[index];
    if (!card.nextReview) return 0;
    
    const now = new Date();
    const dueDate = new Date(card.nextReview);
    const daysOverdue = (now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24);
    
    return daysOverdue + (1 / (card.easeFactor || 2.5));
  }

  public getNext(): number | null {
    if (this.queue.length === 0) {
      this.checkSessionProgress();
      return null;
    }
    
    const nextCard = this.queue.shift()!;
    console.log(`Getting next card: ${nextCard}`);
    return nextCard;
  }

  public markReviewed(index: number, performance: number) {
    this.reviewed.add(index);
    this.sessionMetrics.totalReviewed++;
    
    if (performance >= 4) {
      this.sessionMetrics.correctStreak++;
      if (this.sessionMetrics.correctStreak % 5 === 0) {
        toast.success(`Great job! ${this.sessionMetrics.correctStreak} cards correct in a row! 🎯`);
      }
    } else {
      this.sessionMetrics.correctStreak = 0;
    }

    // Requeue card if needed based on performance and mode
    if (this.options.mode === 'cram' && performance < 3) {
      this.queue.push(index);
      console.log(`Requeuing card ${index} due to low performance`);
    }
  }

  private checkSessionProgress() {
    const duration = (new Date().getTime() - this.sessionMetrics.startTime.getTime()) / 1000;
    const metrics = calculateLearningMetrics([]);
    
    if (metrics.retentionRate > 85) {
      toast.success('Excellent study session! Your retention is very high! 🌟');
    } else if (duration > 1200) { // 20 minutes
      toast.info('Consider taking a break to maintain focus 🎯');
    }
  }

  public getRemainingCount(): number {
    return this.queue.length;
  }

  public reset() {
    this.reviewed.clear();
    this.sessionMetrics = {
      correctStreak: 0,
      totalReviewed: 0,
      startTime: new Date(),
    };
    this.initializeQueue();
    console.log('Queue reset');
  }
}