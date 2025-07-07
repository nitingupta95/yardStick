"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, TrendingUp, TrendingDown, IndianRupee } from 'lucide-react';

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

interface MonthlyBarChartProps {
  data: MonthlyData[];
}

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ data = [] }) => {
  // Get current month name (e.g., "Jul")
  const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthName = new Date().toLocaleString('default', { month: 'short' });
  
  // Find current month data (instead of just taking last item)
  const currentMonth = data.find(item => item.month === currentMonthName) || 
                      (data.length > 0 ? data[data.length - 1] : null);

  // Find previous month data
  const currentMonthIndex = monthMap.indexOf(currentMonth?.month || '');
  const previousMonthName = currentMonthIndex > 0 ? monthMap[currentMonthIndex - 1] : '';
  const previousMonth = previousMonthName ? data.find(item => item.month === previousMonthName) : null;

  // Calculate net change
  const netChange = currentMonth && previousMonth 
    ? currentMonth.net - previousMonth.net 
    : 0;
  const isPositiveChange = netChange >= 0;


  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                {entry.value.toFixed(2)}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom tick formatter for YAxis
  const renderCurrencyTick = ({ x, y, payload }: any) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={4} textAnchor="end" fill="#666" fontSize={12}>
          <tspan className="flex items-center">
            <IndianRupee className="inline w-3 h-3" />
            {payload.value}
          </tspan>
        </text>
      </g>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2 rounded-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Monthly Overview</h3>
            <p className="text-gray-600 text-sm">Income vs Expenses</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`flex items-center gap-1 ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
            {isPositiveChange ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {isPositiveChange ? '+' : ''}
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                {Math.abs(netChange).toFixed(2)}
              </span>
            </span>
          </div>
          <div className="text-xs text-gray-500">vs last month</div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={renderCurrencyTick}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="income" 
              fill="#10b981" 
              name="Income"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="expenses" 
              fill="#ef4444" 
              name="Expenses"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

       <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
            <IndianRupee className="w-4 h-4" />
            {(currentMonth?.income ?? 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">This Month Income</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 flex items-center justify-center gap-1">
            <IndianRupee className="w-4 h-4" />
            {(currentMonth?.expenses ?? 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">This Month Expenses</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${
            (currentMonth?.net ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {(currentMonth?.net ?? 0) < 0 && <span>-</span>}
             
            <IndianRupee className="w-4 h-4" />
            {Math.abs(currentMonth?.net ?? 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Net Income</div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBarChart;