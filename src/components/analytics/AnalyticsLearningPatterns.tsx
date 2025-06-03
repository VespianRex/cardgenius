
import { Card } from "@/components/ui/card";
import { LearningPatterns } from "./LearningPatterns";

interface AnalyticsLearningPatternsProps {
  data: Array<{
    date: string;
    cardsReviewed: number;
    performance: number;
    studyDuration: number;
  }>;
}

export const AnalyticsLearningPatterns = ({ data }: AnalyticsLearningPatternsProps) => {
  return (
    <Card className="p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-900">
        Learning Patterns
      </h3>
      <div className="w-full h-60 sm:h-72 md:h-80 lg:h-96">
        <LearningPatterns data={data} />
      </div>
    </Card>
  );
};
