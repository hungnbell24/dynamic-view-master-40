
import React from 'react';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';

interface User {
  id: number;
  name: string;
  progress: number;
  status: 'automatic' | 'magnetic' | 'synergistic';
  avatars: string[];
  count: number;
  role: string;
  subRole: string;
}

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <div className="dashboard-card p-5 animate-slide-up opacity-0 animation-delay-300">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-medium text-dashboard-text">Users</h3>
        <button className="text-dashboard-text-secondary hover:text-dashboard-text transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-dashboard-text-secondary text-sm">
              <th className="pb-3 pr-2 font-medium w-12"></th>
              <th className="pb-3 px-2 font-medium">Group</th>
              <th className="pb-3 px-2 font-medium w-1/4">Out of subscription</th>
              <th className="pb-3 px-2 font-medium">Status</th>
              <th className="pb-3 px-2 font-medium">Users</th>
              <th className="pb-3 px-2 font-medium">Info</th>
              <th className="pb-3 pl-2 font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="table-row">
                <td className="py-3 pr-2 text-dashboard-text-secondary text-center">{user.id}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-dashboard-highlight/20 flex items-center justify-center text-dashboard-text font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-dashboard-text text-sm">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    <div className="progress-bar w-full">
                      <div 
                        className="progress-bar-fill bg-dashboard-highlight" 
                        style={{ width: `${user.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-dashboard-text text-sm whitespace-nowrap">{user.progress}%</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className={`status-badge ${user.status}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    <div className="avatar-stack">
                      {user.avatars.slice(0, 3).map((avatar, index) => (
                        <img 
                          key={index}
                          src={avatar}
                          alt="User avatar"
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-dashboard-card"
                        />
                      ))}
                    </div>
                    <span className="text-dashboard-text text-sm">+{user.count}</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div>
                    <p className="text-dashboard-text text-sm">{user.role}</p>
                    <p className="text-dashboard-text-secondary text-xs">{user.subRole}</p>
                  </div>
                </td>
                <td className="py-3 pl-2">
                  <div className="flex items-center space-x-2 justify-end">
                    <button className="p-1.5 rounded-md hover:bg-dashboard-highlight/10 text-dashboard-text-secondary hover:text-dashboard-text transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-dashboard-highlight/10 text-dashboard-text-secondary hover:text-dashboard-text transition-colors">
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
