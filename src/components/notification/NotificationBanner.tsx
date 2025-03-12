
import React from 'react';
import { AlertCircle, ChevronRight } from 'lucide-react';

interface NotificationBannerProps {
  title: string;
  description: string;
  action?: () => void;
  actionLabel?: string;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  title,
  description,
  action,
  actionLabel = 'Continue',
}) => {
  return (
    <div className="dashboard-card p-4 animate-slide-up opacity-0 animation-delay-100 border border-dashboard-highlight/20 bg-dashboard-highlight/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-dashboard-highlight/20 flex items-center justify-center">
            <AlertCircle className="h-5 w-5 text-dashboard-highlight" />
          </div>
          <div>
            <p className="text-white font-medium">{title}</p>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </div>
        
        <button 
          onClick={action}
          className="flex items-center space-x-1 text-dashboard-highlight hover:text-white transition-colors"
        >
          <span className="text-sm font-medium">{actionLabel}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
