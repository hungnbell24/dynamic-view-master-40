
import React from 'react';
import { MailPlus, Mail, Star, Send, Archive, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EmailSidebarProps {
  unreadCount: number;
  selectedTab: string;
  onTabChange: (value: string) => void;
  onComposeClick: () => void;
}

const EmailSidebar: React.FC<EmailSidebarProps> = ({
  unreadCount,
  selectedTab,
  onTabChange,
  onComposeClick,
}) => {
  return (
    <div className="lg:col-span-1 dashboard-card p-4">
      <Button 
        onClick={onComposeClick} 
        className="w-full mb-4 justify-start gap-2"
        variant="default"
      >
        <MailPlus className="h-4 w-4" />
        Compose
      </Button>
      
      <Tabs 
        value={selectedTab} 
        orientation="vertical" 
        className="w-full"
        onValueChange={onTabChange}
      >
        <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1">
          <TabsTrigger 
            value="inbox" 
            className="justify-start px-2 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>Inbox</span>
              </div>
              {unreadCount > 0 && (
                <Badge variant="secondary">{unreadCount}</Badge>
              )}
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="starred" 
            className="justify-start px-2 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              <span>Starred</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="sent" 
            className="justify-start px-2 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex items-center">
              <Send className="h-4 w-4 mr-2" />
              <span>Sent</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="drafts" 
            className="justify-start px-2 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex items-center">
              <Archive className="h-4 w-4 mr-2" />
              <span>Drafts</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="trash" 
            className="justify-start px-2 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex items-center">
              <Trash2 className="h-4 w-4 mr-2" />
              <span>Trash</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default EmailSidebar;
