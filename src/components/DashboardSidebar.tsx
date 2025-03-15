import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  CheckSquare,
  Mail,
  Calendar,
  BarChart2,
  Building2,
  Contact,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from './theme/ThemeProvider';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: CheckSquare, label: 'Task', path: '/task' },
  { icon: Mail, label: 'Email', path: '/email' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  { icon: Building2, label: 'Companies', path: '/companies' },
  { icon: Contact, label: 'Contact', path: '/contact' },
];

const bottomMenuItems = [
  { icon: HelpCircle, label: 'Help Center', path: '/help' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  const { theme } = useTheme();
  const textColor = (item): String => {
    return isActive(item.path) ?
      (theme === 'dark' ? 'text-white' : 'text-black') + ' font-medium' :
      (theme === 'dark' ? 'text-gray-400' : 'text-black') + ' font-normal'

  }

  const hoverTextColor = (): String => {
    return theme === 'dark' ? 'hover:bg-white/5' : 'text-black';
  }

  return (
    <Sidebar className="border-r border-white/5">
      <SidebarHeader className="py-6 flex justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-dashboard-highlight flex items-center justify-center">
            <span className={"font-bold text-white"}>K</span>
          </div>
          <span className={"font-medium text-lg "}>Kuantum</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label} className="my-1">
                  <SidebarMenuButton asChild className={`
                    group py-2 ${hoverTextColor()} rounded-md
                    ${textColor(item)}
                  `}>
                    <Link to={item.path} className="flex items-center px-3 py-1">
                      <item.icon
                        className={`mr-3 h-5 w-5 transition-colors ${textColor(item.path)}`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto px-3 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.label} className="my-1">
                  <SidebarMenuButton asChild
                    className={`
                    group  py-2 ${hoverTextColor()} rounded-md ${textColor(item)}
                  `}>
                    <Link to={item.path} className="flex items-center px-3 py-1">
                      <item.icon
                        className={`mr-3 h-5 w-5 transition-colors ${textColor(item.path)}`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Logout Button */}
              <SidebarMenuItem className="my-1">
                <SidebarMenuButton asChild className={`
                    group  py-2 ${hoverTextColor()} rounded-md ${textColor({ path: '/unknow' })}
                  `}>
                  <Button
                    onClick={logout}
                    variant="ghost"
                    className="w-full flex items-center px-3 py-1 justify-start"
                  >
                    <LogOut className={"mr-3 h-5 w-5 " + textColor({ path: '/unknow' })} />
                    <span >Logout</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-8 px-3">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className={"text-sm font-medium " + textColor({ path: '/unknow' })}>Jansen Sitompul</p>
              <p className={"text-xs " + textColor({ path: '/unknow' })}>Admin</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar >
  );
};

export default DashboardSidebar;
