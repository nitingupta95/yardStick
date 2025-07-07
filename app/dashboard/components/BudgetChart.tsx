import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';

interface BudgetData {
  month: string;
  budget: number;
  spent: number;
  remaining: number;
}

interface BudgetChartProps {
  data: BudgetData[];
}

const BudgetChart: React.FC<BudgetChartProps> = ({ data }) => {
  const chartData = data.filter(item => item.budget > 0);
    
  const currentMonth = new Date().toLocaleString('default', { month: 'short' });
  const currentMonthData = chartData.find(b => b.month === currentMonth) || chartData[chartData.length - 1];
    
  const budgetUtilization = currentMonthData 
      ? (currentMonthData.spent / currentMonthData.budget) * 100 
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Budget Overview</h3>
            <p className="text-gray-600 text-sm">Monthly budget vs spending</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {budgetUtilization.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Budget Used</div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="spentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `₹${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
              formatter={(value: number, name: string) => [
                `₹${value.toFixed(2)}`,
                name.charAt(0).toUpperCase() + name.slice(1)
              ]}
            />
            <Area
              type="monotone"
              dataKey="budget"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#budgetGradient)"
              name="Budget"
            />
            <Area
              type="monotone"
              dataKey="spent"
              stroke="#ef4444"
              strokeWidth={3}
              fill="url(#spentGradient)"
              name="Spent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
             ₹{(currentMonthData?.budget || 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Monthly Budget</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            ₹{(currentMonthData?.spent || 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Amount Spent</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            ₹{(currentMonthData?.remaining || 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Remaining</div>
        </div>
      </div>
    </div>
  );
};

export default BudgetChart;
