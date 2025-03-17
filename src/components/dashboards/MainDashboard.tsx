
import React from 'react';
import StatCard from '@/components/stat-card/StatCard';
import NotificationBanner from '@/components/notification/NotificationBanner';
import TeamSection from '@/components/team/TeamSection';
import WalletCard from '@/components/wallet/WalletCard';
import UsersTable from '@/components/users/UsersTable';
import { PhoneCall, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface MainDashboardProps {
  isLoading: boolean;
  summaryData: {
    call: {
      total: number;
      miss: number;
    };
    web: {
      total: number;
      miss: number;
    };
  } | null;
  teamMembers: any[];
  walletData: any;
  users: any[];
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  isLoading,
  summaryData,
  teamMembers,
  walletData,
  users
}) => {
  return (
    <div className="p-6 pt-0 space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <div className="dashboard-card p-5">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </div>
            <div className="dashboard-card p-5">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </div>
            <div className="dashboard-card p-5">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </div>
          </>
        ) : (
          <>
            <StatCard
              icon={<PhoneCall size={24} />}
              amount={summaryData?.call.total.toString() || "0"}
              label="Total Calls"
              className="animation-delay-100"
            />
            <StatCard
              icon={<PhoneCall size={24} />}
              amount={summaryData?.call.miss.toString() || "0"}
              label="Missed Calls"
              className="animation-delay-200"
            />
            <StatCard
              icon={<Globe size={24} />}
              amount={summaryData?.web.miss.toString() || "0"}
              label="Missed Web Contacts"
              className="animation-delay-300"
            />
          </>
        )}
      </div>

      {/* Notification banner */}
      <NotificationBanner
        title="We'd like to propose some improvements"
        description="We analyzed your account's performance and here's what we found out"
        actionLabel="Continue"
        action={() => {
          toast.info('Analyzing account performance...', {
            description: "We'll have recommendations for you soon"
          });
        }}
      />

      {/* Team and Wallet row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamSection title="Our Team" members={teamMembers} />
        <WalletCard title="Your Wallet account" data={walletData} />
      </div>

      {/* Users table */}
      <UsersTable users={users} />
    </div>
  );
};

export default MainDashboard;
