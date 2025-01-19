import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card } from "@/components/ui/card";
import { analyzeStudyHabits } from '@/utils/analytics';

interface LearningPatternsProps {
  data: Array<{
    date: string;
    performance: number;
    cardsReviewed: number;
    studyDuration: number;
  }>;
}

export const LearningPatterns = ({ data }: LearningPatternsProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Learning Patterns</h3>
      <div className="w-full h-[300px]">
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="performance"
            stroke="#2C5282"
            name="Performance"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cardsReviewed"
            stroke="#4299E1"
            name="Cards Reviewed"
          />
        </LineChart>
      </div>
    </Card>
  );
};