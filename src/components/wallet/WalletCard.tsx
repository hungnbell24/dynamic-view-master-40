
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
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 h-60 md:h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-full md:w-1/2 grid grid-cols-1 gap-4 mt-4 md:mt-0">
          <div className="flex flex-col space-y-1">
            <div className="text-lg font-semibold text-white">${data.revenue.toFixed(2)}</div>
            <div className="text-sm text-gray-400">Month Revenue</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="text-lg font-semibold text-white">${data.income.toFixed(2)}</div>
            <div className="text-sm text-gray-400">Month Income</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="text-lg font-semibold text-white">${data.roi.toFixed(2)}</div>
            <div className="text-sm text-gray-400">Month ROI</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="text-lg font-semibold text-white">${data.expenses.toFixed(2)}</div>
            <div className="text-sm text-gray-400">Month Expenses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
