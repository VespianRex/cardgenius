import { useState, useEffect } from 'react';
import { SRSCard, CardReview, calculateNextReview } from '../utils/srsSystem';
import { saveToStorage, loadFromStorage } from '../utils/storage/srsStorage';
import { toast } from 'sonner';

export const useSRS = () => {
  const [cards, setCards] = useState<SRSCard[]>([]);
  const [reviews, setReviews] = useState<CardReview[]>([]);

  useEffect(() => {
    const storedData = loadFromStorage();
    if (storedData) {
      setCards(storedData.cards);
      setReviews(storedData.reviews);
      console.log('Loaded SRS data from storage:', storedData);
    }
  }, []);

  const saveReview = (
    cardId: string,
    confidence: number,
    responseTime: number
  ) => {
    const card = cards.find(c => c.cardId === cardId);
    if (!card) return;

    const cardReviews = reviews.filter(r => r.cardId === cardId);
    const { nextInterval, newEaseFactor } = calculateNextReview(
      confidence,
      card.interval,
      card.easeFactor,
      cardReviews
    );

    const newReview: CardReview = {
      cardId,
      lastReviewed: new Date(),
      nextReview: new Date(Date.now() + nextInterval * 24 * 60 * 60 * 1000),
      interval: nextInterval,
      easeFactor: newEaseFactor,
      consecutiveCorrect: confidence >= 4 ? card.consecutiveCorrect + 1 : 0,
      performance: [...card.performance, confidence],
      tags: card.tags,
      metadata: {
        totalReviews: card.metadata.totalReviews + 1,
        correctReviews: card.metadata.correctReviews + (confidence >= 4 ? 1 : 0),
        averageResponse: (card.metadata.averageResponse * card.metadata.totalReviews + responseTime) / (card.metadata.totalReviews + 1)
      }
    };

    setReviews(prev => [...prev, newReview]);
    setCards(prev => prev.map(c => 
      c.cardId === cardId 
        ? { ...c, ...newReview }
        : c
    ));

    saveToStorage({
      cards,
      reviews: [...reviews, newReview],
      lastSync: new Date().toISOString()
    });

    console.log('Saved review:', newReview);
    toast.success('Review saved successfully');
  };

  return {
    cards,
    reviews,
    saveReview
  };
};