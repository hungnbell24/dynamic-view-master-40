
import React from 'react';
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import DashboardSidebar from './DashboardSidebar';
import { ThemeProvider } from './theme/ThemeProvider';
import ThemeToggle from './theme/ThemeToggle';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const MobileSidebarToggle = () => {
  const { openMobile, setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="md:hidden fixed left-4 top-4 z-50"
      onClick={() => setOpenMobile(true)}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 overflow-y-auto">
            <MobileSidebarToggle />
            <div className="absolute top-4 right-6 z-10">
              <ThemeToggle />
            </div>
            {children}
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default DashboardLayout;
