
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MoreHorizontal } from 'lucide-react';

interface WalletCardProps {
  title: string;
  data: {
    revenue: number;
    income: number;
    roi: number;
    expenses: number;
  };
}

const WalletCard: React.FC<WalletCardProps> = ({ title, data }) => {
  const pieData = [
    { name: 'Revenue', value: data.revenue, color: '#4adb61' },
    { name: 'Income', value: data.income, color: '#3e7bfa' },
    { name: 'ROI', value: data.roi, color: '#bc5af5' },
    { name: 'Expenses', value: data.expenses, color: '#ff9046' },
  ];

  return (
    <div className="dashboard-card p-5 animate-slide-up opacity-0 animation-delay-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium text-dashboard-text">{title}</h3>
        <button className="text-dashboard-text-secondary hover:text-dashboard-text transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div className="flex flex-row space-x-4">
        {/* Smaller pie chart on the left */}
        <div className="w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                strokeWidth={3}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Data statistics in a vertical line next to the chart */}
        <div className="w-1/2 flex flex-col justify-center space-y-4">
          <div className="flex flex-col space-y-1">
            <div className="text-lg font-semibold text-dashboard-text">${data.revenue.toFixed(2)}</div>
            <div className="text-sm text-dashboard-text-secondary">Month Revenue</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="text-lg font-semibold text-dashboard-text">${data.income.toFixed(2)}</div>
            <div className="text-sm text-dashboard-text-secondary">Month Income</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="text-lg font-semibold text-dashboard-text">${data.roi.toFixed(2)}</div>
            <div className="text-sm text-dashboard-text-secondary">Month ROI</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="text-lg font-semibold text-dashboard-text">${data.expenses.toFixed(2)}</div>
            <div className="text-sm text-dashboard-text-secondary">Month Expenses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
