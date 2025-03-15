
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardHeader from '@/components/header/DashboardHeader';
import StatCard from '@/components/stat-card/StatCard';
import NotificationBanner from '@/components/notification/NotificationBanner';
import TeamSection from '@/components/team/TeamSection';
import WalletCard from '@/components/wallet/WalletCard';
import UsersTable from '@/components/users/UsersTable';
import { CreditCard, DollarSign, PhoneCall, Globe, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

interface QuickSummaryData {
  call: {
    total: number;
    miss: number;
  };
  web: {
    total: number;
    miss: number;
  };
}

const Index = () => {
  const { authData } = useAuth();
  const [summaryData, setSummaryData] = useState<QuickSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a welcome toast when the dashboard loads
    toast.success('Welcome to Telehub Dashboard', {
      description: 'OMNICHANNEL support & saleS platform',
      duration: 5000,
      position: 'bottom-right',
    });

    // Fetch quick summary data
    const fetchSummaryData = async () => {
      try {
        if (!authData?.token) {
          console.error('No auth token found');
          setIsLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3003/quick-summary', {
          method: 'GET',
          headers: {
            'Authorization': authData.token,
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();

        if (!result.error) {
          console.log('Quick summary data:', result.data);
          setSummaryData(result.data);
        } else {
          console.error('Error fetching summary data:', result.data);
          toast.error('Failed to fetch summary data', { position: 'bottom-right' });
        }
      } catch (error) {
        console.error('Error fetching summary data:', error);
        toast.error('Network error while fetching summary data', { position: 'bottom-right' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummaryData();
  }, [authData]);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Latoya Langosh',
      role: 'Cross-media',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'online' as const,
    },
    {
      id: 2,
      name: 'Abel Mohr',
      role: 'Revolutionary',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'online' as const,
    },
    {
      id: 3,
      name: 'Erick Champlin',
      role: 'Mission-critical',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
      status: 'online' as const,
    },
  ];

  // Wallet data
  const walletData = {
    revenue: 779.74,
    income: 184.14,
    roi: 734.59,
    expenses: 207.42,
  };

  // Users data
  const users = [
    {
      id: 1,
      name: 'Grand Rapids',
      progress: 75,
      status: 'automatic' as const,
      avatars: [
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://randomuser.me/api/portraits/men/36.jpg',
      ],
      count: 3,
      role: 'Technician',
      subRole: 'Coordinator',
    },
    {
      id: 2,
      name: 'Bell Gardens',
      progress: 75,
      status: 'magnetic' as const,
      avatars: [
        'https://randomuser.me/api/portraits/women/28.jpg',
        'https://randomuser.me/api/portraits/men/42.jpg',
        'https://randomuser.me/api/portraits/women/56.jpg',
      ],
      count: 8,
      role: 'Representative',
      subRole: 'Facilitator',
    },
    {
      id: 3,
      name: 'Broomfield',
      progress: 75,
      status: 'synergistic' as const,
      avatars: [
        'https://randomuser.me/api/portraits/men/22.jpg',
        'https://randomuser.me/api/portraits/women/64.jpg',
        'https://randomuser.me/api/portraits/men/76.jpg',
      ],
      count: 3,
      role: 'Developer',
      subRole: 'Manager',
    },
  ];

  return (
    <DashboardLayout>
      <DashboardHeader title="Dashboard" />

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
    </DashboardLayout>
  );
};

export default Index;
