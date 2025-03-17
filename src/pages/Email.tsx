
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { MailPlus } from 'lucide-react';
import EmailList from '@/components/email/EmailList';
import EmailSidebar from '@/components/email/EmailSidebar';
import EmailSearchBar from '@/components/email/EmailSearchBar';
import { useEmailManagement } from '@/hooks/useEmailManagement';

const EmailPage: React.FC = () => {
  const {
    selectedTab,
    setSelectedTab,
    searchQuery, 
    setSearchQuery,
    getFilteredEmails,
    toggleStar,
    markAsRead,
    deleteEmail,
    composeEmail,
    handleRefresh,
    unreadCount
  } = useEmailManagement();

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Email</h1>
          <Button onClick={composeEmail} className="gap-2">
            <MailPlus className="h-4 w-4" />
            Compose
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <EmailSidebar 
            unreadCount={unreadCount}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            onComposeClick={composeEmail}
          />
          
          <div className="lg:col-span-4 dashboard-card p-4">
            <EmailSearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onRefresh={handleRefresh}
            />
            
            <Tabs value={selectedTab}>
              <TabsContent value={selectedTab} className="m-0">
                <EmailList 
                  emails={getFilteredEmails()}
                  onRead={markAsRead}
                  onToggleStar={toggleStar}
                  onDelete={deleteEmail}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmailPage;
