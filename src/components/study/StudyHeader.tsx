import { StudyModeSelector } from "../StudyModeSelector";
import { StudyProgress } from "../StudyProgress";
import { StudyTimer } from "../StudyTimer";
import { Progress } from "../ui/progress";

interface StudyHeaderProps {
  currentCardIndex: number;
  totalCards: number;
  startTime: Date;
  ratings: {
    easy: number;
    medium: number;
    hard: number;
  };
  streak: number;
  onStudyModeChange: (mode: 'regular' | 'cram' | 'review' | 'scheduled') => void;
}

export const StudyHeader = ({
  currentCardIndex,
  totalCards,
  startTime,
  ratings,
  streak,
  onStudyModeChange
}: StudyHeaderProps) => {
  return (
    <div className="space-y-6 mb-8">
      <StudyModeSelector onSelectMode={onStudyModeChange} />
      
      <StudyProgress 
        cardsReviewed={ratings.easy + ratings.medium + ratings.hard}
        totalCards={totalCards}
        startTime={startTime}
        ratings={ratings}
        streak={streak}
      />

      <div className="flex items-center justify-between">
        <Progress 
          value={((currentCardIndex + 1) / totalCards) * 100} 
          className="h-2 flex-1 mr-4"
        />
        <StudyTimer 
          onBreakStart={() => {}}
          onBreakEnd={() => {}}
        />
      </div>
    </div>
  );
};