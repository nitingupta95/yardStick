import React from 'react';
import { DivideIcon , TrendingUp, TrendingDown } from 'lucide-react';

import { LucideIcon } from 'lucide-react'; // or use React.ComponentType if using other icons

export interface SummaryCardProps {
  title: string;
  value: string | React.ReactNode;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon; // OR React.ComponentType if it's not from Lucide
  color: 'blue' | 'green' | 'red' | 'purple' | 'orange';
  trend?: 'up' | 'down' | 'neutral';
}


const colorClasses = {
  blue: {
    bg: 'from-blue-500 to-blue-600',
    text: 'text-blue-600',
    lightBg: 'bg-blue-50',
  },
  green: {
    bg: 'from-green-500 to-green-600',
    text: 'text-green-600',
    lightBg: 'bg-green-50',
  },
  red: {
    bg: 'from-red-500 to-red-600',
    text: 'text-red-600',
    lightBg: 'bg-red-50',
  },
  purple: {
    bg: 'from-purple-500 to-purple-600',
    text: 'text-purple-600',
    lightBg: 'bg-purple-50',
  },
  orange: {
    bg: 'from-orange-500 to-orange-600',
    text: 'text-orange-600',
    lightBg: 'bg-orange-50',
  },
};

const  SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  color,
  trend = 'neutral'
}) => {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`bg-gradient-to-r ${colors.bg} p-3 rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' 
              ? 'bg-green-100 text-green-700' 
              : trend === 'down'
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {trend === 'up' && <TrendingUp className="w-3 h-3" />}
            {trend === 'down' && <TrendingDown className="w-3 h-3" />}
            {change > 0 ? '+' : ''}{change.toFixed(1)}%
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {changeLabel && (
          <p className="text-xs text-gray-500">{changeLabel}</p>
        )}
      </div>

      <div className={`mt-4 h-1 ${colors.lightBg} rounded-full overflow-hidden`}>
        <div 
          className={`h-full bg-gradient-to-r ${colors.bg} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${Math.min(Math.abs(change || 0) * 2, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default SummaryCard;