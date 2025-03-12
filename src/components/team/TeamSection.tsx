
import React from 'react';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline';
}

interface TeamSectionProps {
  title: string;
  members: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ title, members }) => {
  return (
    <div className="dashboard-card p-5 animate-slide-up opacity-0 animation-delay-200">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-medium text-dashboard-text">{title}</h3>
        <button className="text-dashboard-text-secondary hover:text-dashboard-text transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-dashboard-highlight/20 overflow-hidden">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-dashboard-text">{member.name}</p>
                <p className="text-xs text-dashboard-text-secondary">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`status-badge ${member.status === 'online' ? 'online' : ''}`}>
                Online
              </div>
              <button className="text-dashboard-text-secondary hover:text-dashboard-text transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
