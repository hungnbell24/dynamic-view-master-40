
import React from 'react';
import StatCard from '@/components/stat-card/StatCard';
import NotificationBanner from '@/components/notification/NotificationBanner';
import { BarChart2, TrendingUp, DollarSign, Users } from 'lucide-react';
import { toast } from 'sonner';

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="p-6 pt-0 space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<TrendingUp size={24} />}
          amount="87.4%"
          label="Conversion Rate"
          className="animation-delay-100"
        />
        <StatCard
          icon={<Users size={24} />}
          amount="4,526"
          label="Total Users"
          className="animation-delay-200"
        />
        <StatCard
          icon={<BarChart2 size={24} />}
          amount="16.5k"
          label="Weekly Views"
          className="animation-delay-300"
        />
        <StatCard
          icon={<DollarSign size={24} />}
          amount="$24,380"
          label="Total Revenue"
          className="animation-delay-400"
        />
      </div>

      {/* Notification banner */}
      <NotificationBanner
        title="Analytics report is ready"
        description="Your monthly analytics report has been generated and is ready to view"
        actionLabel="View Report"
        action={() => {
          toast.success('Opening analytics report...', {
            description: "Preparing your analytics dashboard"
          });
        }}
      />

      {/* Chart section */}
      <div className="dashboard-card p-5 h-[300px] animate-slide-up opacity-0 animation-delay-500">
        <h3 className="text-lg font-medium mb-4 text-dashboard-text">Performance Overview</h3>
        <div className="flex items-center justify-center h-[calc(100%-2rem)]">
          <p className="text-dashboard-text-secondary">Analytics charts will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
