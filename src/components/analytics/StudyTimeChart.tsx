
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StudyTimeChartProps {
  data: Array<{
    date: string;
    minutes: number;
  }>;
}

export const StudyTimeChart = ({ data }: StudyTimeChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="date" 
          fontSize={10}
          stroke="#64748b"
          tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        />
        <YAxis 
          fontSize={10}
          stroke="#64748b"
          tickFormatter={(value) => `${value}min`}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '12px'
          }}
          labelFormatter={(date) => new Date(date).toLocaleDateString()}
          formatter={(value) => [`${value} minutes`, 'Study Time']}
        />
        <Bar 
          dataKey="minutes" 
          fill="#8b5cf6" 
          radius={[2, 2, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
