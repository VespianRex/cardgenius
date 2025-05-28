
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SuccessRateChartProps {
  data: Array<{
    date: string;
    rate: number;
  }>;
}

export const SuccessRateChart = ({ data }: SuccessRateChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="date" 
          fontSize={10}
          stroke="#64748b"
          tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        />
        <YAxis 
          domain={[0, 100]}
          fontSize={10}
          stroke="#64748b"
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '12px'
          }}
          labelFormatter={(date) => new Date(date).toLocaleDateString()}
          formatter={(value) => [`${value}%`, 'Success Rate']}
        />
        <Area 
          type="monotone" 
          dataKey="rate" 
          stroke="#10b981" 
          fill="#10b98120"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
