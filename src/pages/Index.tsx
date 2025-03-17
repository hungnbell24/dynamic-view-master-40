
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardHeader from '@/components/header/DashboardHeader';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { DashboardType } from '@/components/dashboards/DashboardSelector';
import MainDashboard from '@/components/dashboards/MainDashboard';
import AnalyticsDashboard from '@/components/dashboards/AnalyticsDashboard';

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
  const [currentDashboard, setCurrentDashboard] = useState<DashboardType>('main');

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

  const handleDashboardChange = (dashboard: DashboardType) => {
    setCurrentDashboard(dashboard);
    toast.info(`Switched to ${dashboard === 'main' ? 'Main' : 'Analytics'} Dashboard`, {
      duration: 2000,
    });
  };

  const renderDashboard = () => {
    switch (currentDashboard) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'main':
      default:
        return (
          <MainDashboard
            isLoading={isLoading}
            summaryData={summaryData}
            teamMembers={teamMembers}
            walletData={walletData}
            users={users}
          />
        );
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader 
        title={currentDashboard === 'main' ? 'Dashboard' : 'Analytics Dashboard'}
        currentDashboard={currentDashboard}
        onDashboardChange={handleDashboardChange}
      />
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Index;
