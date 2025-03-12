
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
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-600 overflow-hidden">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{member.name}</p>
                <p className="text-xs text-gray-400">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`status-badge ${member.status === 'online' ? 'online' : ''}`}>
                Online
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
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
