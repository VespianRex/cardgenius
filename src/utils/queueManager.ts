interface QueueOptions {
  mode: 'regular' | 'cram' | 'review' | 'scheduled';
  maxCards?: number;
  includeNew?: boolean;
}

export class ReviewQueueManager {
  private queue: number[] = [];
  private reviewed: Set<number> = new Set();
  
  constructor(private cards: any[], private options: QueueOptions) {
    console.log('Initializing ReviewQueueManager with options:', options);
    this.initializeQueue();
  }

  private initializeQueue() {
    const { mode, maxCards = Infinity, includeNew = true } = this.options;
    console.log(`Initializing queue for mode: ${mode}`);

    switch (mode) {
      case 'review':
        this.queue = this.cards
          .map((_, index) => index)
          .filter(index => !this.reviewed.has(index) && this.isDue(index));
        break;
      
      case 'cram':
        this.queue = [...Array(this.cards.length)].map((_, i) => i);
        break;
      
      case 'scheduled':
        this.queue = this.cards
          .map((_, index) => index)
          .filter(index => this.isDue(index))
          .slice(0, maxCards);
        break;
      
      default: // regular mode
        const dueCards = this.cards
          .map((_, index) => index)
          .filter(index => this.isDue(index));
        
        const newCards = includeNew 
          ? this.cards
              .map((_, index) => index)
              .filter(index => !this.reviewed.has(index))
              .slice(0, Math.max(0, maxCards - dueCards.length))
          : [];
        
        this.queue = [...dueCards, ...newCards];
    }

    console.log(`Queue initialized with ${this.queue.length} cards`);
  }

  private isDue(index: number): boolean {
    // In a real implementation, this would check the card's next review date
    return !this.reviewed.has(index);
  }

  public getNext(): number | null {
    if (this.queue.length === 0) return null;
    const nextCard = this.queue.shift()!;
    this.reviewed.add(nextCard);
    console.log(`Getting next card: ${nextCard}`);
    return nextCard;
  }

  public markReviewed(index: number, performance: number) {
    this.reviewed.add(index);
    console.log(`Marked card ${index} as reviewed with performance: ${performance}`);
    
    // If in cram mode and performance was poor, add back to queue
    if (this.options.mode === 'cram' && performance < 3) {
      this.queue.push(index);
      console.log(`Added card ${index} back to queue due to low performance`);
    }
  }

  public getRemainingCount(): number {
    return this.queue.length;
  }

  public reset() {
    this.reviewed.clear();
    this.initializeQueue();
    console.log('Queue reset');
  }
}