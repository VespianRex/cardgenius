import { useEffect } from "react";

interface KeyboardManagerProps {
  onNavigateLeft: () => void;
  onNavigateRight: () => void;
  onFlipCard: () => void;
  onRateEasy: () => void;
  onRateMedium: () => void;
  onRateHard: () => void;
  onToggleShortcuts: () => void;
  showRating: boolean;
}

export const KeyboardManager = ({
  onNavigateLeft,
  onNavigateRight,
  onFlipCard,
  onRateEasy,
  onRateMedium,
  onRateHard,
  onToggleShortcuts,
  showRating,
}: KeyboardManagerProps) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'arrowleft':
          onNavigateLeft();
          break;
        case 'arrowright':
          onNavigateRight();
          break;
        case ' ':
          event.preventDefault();
          onFlipCard();
          break;
        case 'e':
          if (showRating) onRateEasy();
          break;
        case 'm':
          if (showRating) onRateMedium();
          break;
        case 'h':
          if (showRating) onRateHard();
          break;
        case 'k':
          onToggleShortcuts();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showRating]);

  return null;
};