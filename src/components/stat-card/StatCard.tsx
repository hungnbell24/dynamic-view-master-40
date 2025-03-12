
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: React.ReactNode;
  amount: string;
  label: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, amount, label, className }) => {
  return (
    <div className={cn(
      'dashboard-card p-5 animate-slide-up opacity-0',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="text-2xl font-bold text-dashboard-text">{amount}</div>
          <div className="text-sm text-dashboard-text-secondary">{label}</div>
        </div>
        <div className="text-dashboard-text-secondary">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
