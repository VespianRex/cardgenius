
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";

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
    <Card className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
      <h3 className="text-lg font-semibold mb-6 text-slate-900">Learning Patterns</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              yAxisId="left" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              labelFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="performance"
              stroke="#2563eb"
              strokeWidth={3}
              name="Performance %"
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cardsReviewed"
              stroke="#7c3aed"
              strokeWidth={3}
              name="Cards Reviewed"
              dot={{ fill: '#7c3aed', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#7c3aed', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
