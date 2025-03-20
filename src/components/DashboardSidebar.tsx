
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import { useIsMobile } from '@/hooks/use-mobile';
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
  useSidebar
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
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from './theme/ThemeProvider';
import { cn } from '@/lib/utils';

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

type ToggleData = 'open' | 'close';

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  const { theme } = useTheme();
  const { state, setOpen } = useSidebar();
  const isMobile = useIsMobile();
  const isDark = theme === 'dark';
  
  const textColorClass = (path: string): string => {
    return isActive(path) 
      ? cn(isDark ? 'text-white' : 'text-black', 'font-medium') 
      : cn(isDark ? 'text-gray-400' : 'text-gray-600', 'font-normal');
  };

  const [isSideBarOpen, setIsSideBarOpen] = React.useState(true);

  const hoverClass = (): string => {
    return cn(isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100');
  };

  const handleToggle = (data: ToggleData) => {
    setIsSideBarOpen(data == 'open');
  };

  const handleMenuItemClick = () => {
    if (state === 'collapsed') {
      setOpen(true);
    }
  };

  const toggleSidebar = () => {
    setOpen(state === 'expanded' ? false : true);
    setIsSideBarOpen(state !== 'expanded');
  };

  return (
    <Sidebar 
      className={cn(
        "border-r", 
        isDark ? "border-sidebar-border bg-sidebar text-sidebar-foreground" : "border-gray-200 bg-white text-gray-800"
      )} 
      collapsible="icon"
    >
      <SidebarHeader className="py-6 flex justify-center">
        <div className="flex items-center space-x-2" >
          <div className="h-8 w-8 rounded-md bg-dashboard-highlight flex items-center justify-center" style={{ minWidth: '2rem' }}>
            <span className="font-bold text-white">T3</span>
          </div>
          {isSideBarOpen && (
            <div style={{ textWrap: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <span className="font-medium text-lg">Telehub</span>
            </div>
          )}

          {!isMobile &&
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-8 w-8 ml-auto"
              onClick={toggleSidebar}
            >
              {state === 'expanded' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </Button>
          }
        </div>
      </SidebarHeader>

      <SidebarContent className={isSideBarOpen ? "px-3" : ""}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label} className="my-1">
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "group py-2 rounded-md",
                      hoverClass(),
                      textColorClass(item.path)
                    )}
                    tooltip={item.label}
                    onClick={handleMenuItemClick}
                  >
                    <Link to={item.path} className="flex items-center py-1 px-3">
                      <item.icon
                        className={cn("mr-3 h-5 w-5", textColorClass(item.path))}
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

      <SidebarFooter className={isSideBarOpen ? "px-3" : ""}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.label} className="my-1">
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "group py-2 rounded-md",
                      hoverClass(),
                      textColorClass(item.path)
                    )}
                    tooltip={item.label}
                    onClick={handleMenuItemClick}
                  >
                    <Link to={item.path} className={"flex items-center py-1" + (isSideBarOpen ? " px-3" : "")}>
                      <item.icon
                        className={cn("mr-3 h-5 w-5", textColorClass(item.path))}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Logout Button */}
              <SidebarMenuItem className="my-1">
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "group py-2 rounded-md",
                    hoverClass(),
                    textColorClass('/unknown')
                  )}
                  tooltip="Logout"
                  onClick={handleMenuItemClick}
                >
                  <Button
                    onClick={logout}
                    variant="ghost"
                    className="w-full flex items-center px-3 py-1 justify-start"
                  >
                    <LogOut className={cn("mr-3 h-5 w-5", textColorClass('/unknown'))} />
                    <span>Logout</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className={"mt-8 overflow-auto" + (isSideBarOpen ? " px-3" : "") + " py-6"} style={{ justifyContent: (isSideBarOpen ? '' : "center") }}>
          <div className="flex items-center space-x-3" style={{ justifyContent: (isSideBarOpen ? '' : "center") }}>
            <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>
            {isSideBarOpen && (
              <div className='relative' style={{ textWrap: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <p className={cn("text-sm font-medium overflow-hidden", textColorClass('/unknown'))}>Jansen Sitompul</p>
                <p className={cn("text-xs", textColorClass('/unknown'))}>Admin</p>
              </div>
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
