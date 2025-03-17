
import React from 'react';
import { ChevronDown } from 'lucide-react';
import SearchBar from '../search/SearchBar';
import DashboardSelector, { DashboardType } from '../dashboards/DashboardSelector';

interface DashboardHeaderProps {
  title: string;
  currentDashboard: DashboardType;
  onDashboardChange: (dashboard: DashboardType) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  currentDashboard, 
  onDashboardChange 
}) => {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dashboard-text animate-fade-in mb-4 md:mb-0">{title}</h1>
        <DashboardSelector 
          currentDashboard={currentDashboard} 
          onDashboardChange={onDashboardChange} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          <SearchBar placeholder="Search" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="dashboard-card px-4 py-2 flex items-center justify-between animate-slide-up opacity-0 animation-delay-100">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-dashboard-green mr-2 rounded-sm" />
              <span className="text-dashboard-text text-sm">A100 800</span>
            </div>
            <ChevronDown className="h-5 w-5 text-dashboard-text-secondary" />
          </div>
          
          <div className="dashboard-card px-4 py-2 flex items-center justify-between animate-slide-up opacity-0 animation-delay-200">
            <span className="text-dashboard-text text-sm">Lambdalabs</span>
            <ChevronDown className="h-5 w-5 text-dashboard-text-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
