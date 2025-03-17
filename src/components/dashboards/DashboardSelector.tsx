
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { LayoutDashboard, BarChart2 } from 'lucide-react';

export type DashboardType = 'main' | 'analytics';

interface DashboardSelectorProps {
  currentDashboard: DashboardType;
  onDashboardChange: (dashboard: DashboardType) => void;
}

const DashboardSelector: React.FC<DashboardSelectorProps> = ({ 
  currentDashboard, 
  onDashboardChange 
}) => {
  return (
    <div className="dashboard-card flex items-center p-2 w-full max-w-[250px] mb-6 animate-slide-up opacity-0 animation-delay-100">
      <Select 
        value={currentDashboard} 
        onValueChange={(value: DashboardType) => onDashboardChange(value)}
      >
        <SelectTrigger className="w-full border-none shadow-none bg-transparent focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 h-9">
          <div className="flex items-center gap-2">
            {currentDashboard === 'main' ? (
              <LayoutDashboard className="h-5 w-5 text-dashboard-text" />
            ) : (
              <BarChart2 className="h-5 w-5 text-dashboard-text" />
            )}
            <SelectValue placeholder="Select dashboard" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="main" className="flex items-center gap-2 py-3">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5" />
                <span>Main Dashboard</span>
              </div>
            </SelectItem>
            <SelectItem value="analytics" className="flex items-center gap-2 py-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                <span>Analytics Dashboard</span>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DashboardSelector;
