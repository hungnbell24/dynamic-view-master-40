
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from './DashboardSidebar';
import { ThemeProvider } from './theme/ThemeProvider';
import ThemeToggle from './theme/ThemeToggle';

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
