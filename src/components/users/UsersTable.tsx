
import React, { useState } from 'react';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<User>({
    defaultValues: editingUser || {
      id: 0,
      name: '',
      progress: 0,
      status: 'automatic',
      avatars: [],
      count: 0,
      role: '',
      subRole: ''
    }
  });

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    form.reset(user);
    setIsEditModalOpen(true);
  };

  const onSubmit = (data: User) => {
    console.log('Updated user:', data);
    // Here you would typically update the user in your data source
    setIsEditModalOpen(false);
  };

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
                    <button 
                      className="p-1.5 rounded-md hover:bg-dashboard-highlight/10 text-dashboard-text-secondary hover:text-dashboard-text transition-colors"
                      onClick={() => handleEditClick(user)}
                    >
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

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User Information</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Role</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter className={isMobile ? "flex-col space-y-2" : ""}>
                {isMobile ? (
                  <>
                    <Button type="submit">Save Changes</Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersTable;
