
import React, { useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardHeader from '@/components/header/DashboardHeader';
import StatCard from '@/components/stat-card/StatCard';
import NotificationBanner from '@/components/notification/NotificationBanner';
import TeamSection from '@/components/team/TeamSection';
import WalletCard from '@/components/wallet/WalletCard';
import UsersTable from '@/components/users/UsersTable';
import { CreditCard, DollarSign, Wallet } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  useEffect(() => {
    // Add a welcome toast when the dashboard loads
    toast.success('Welcome to Kuantum Dashboard', {
      description: 'Your financial analytics platform',
      duration: 5000,
    });
  }, []);

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
          <StatCard 
            icon={<CreditCard size={24} />} 
            amount="$27,340" 
            label="Total Expenses" 
            className="animation-delay-100"
          />
          <StatCard 
            icon={<DollarSign size={24} />} 
            amount="$238.33" 
            label="Total Expenses" 
            className="animation-delay-200"
          />
          <StatCard 
            icon={<Wallet size={24} />} 
            amount="$21,574" 
            label="Total Expenses" 
            className="animation-delay-300"
          />
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
