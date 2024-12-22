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
  onExportAnalytics: () => void;
}

export const StudyHeader = ({
  currentCardIndex,
  totalCards,
  startTime,
  ratings,
  streak,
  onStudyModeChange,
  onExportAnalytics
}: StudyHeaderProps) => {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex justify-between items-center">
        <StudyModeSelector onSelectMode={onStudyModeChange} />
        <button
          onClick={onExportAnalytics}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Export Analytics
        </button>
      </div>
      
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