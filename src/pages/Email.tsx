import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Star, 
  Trash2, 
  Send, 
  Archive, 
  MailPlus, 
  ChevronDown,
  Search,
  RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar: string;
  };
  subject: string;
  preview: string;
  isRead: boolean;
  isStarred: boolean;
  date: string;
  labels?: string[];
}

const EmailPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      from: {
        name: 'Jessica Wilson',
        email: 'jessica@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      },
      subject: 'Monthly Report Overview',
      preview: 'Here is the monthly report you requested. Please review and provide feedback at your earliest convenience.',
      isRead: false,
      isStarred: true,
      date: '10:42 AM',
      labels: ['Work', 'Important'],
    },
    {
      id: '2',
      from: {
        name: 'Michael Chen',
        email: 'michael@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      },
      subject: 'Team Meeting - Agenda Items',
      preview: 'Can you please add your agenda items for tomorrow\'s team meeting? We need to finalize the list by EOD.',
      isRead: true,
      isStarred: false,
      date: 'Yesterday',
    },
    {
      id: '3',
      from: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
      },
      subject: 'Update on Project Kuantum',
      preview: 'The client has approved the latest revisions. We can proceed with the implementation phase as scheduled.',
      isRead: false,
      isStarred: false,
      date: 'Jul 15',
      labels: ['Project'],
    },
    {
      id: '4',
      from: {
        name: 'David Thompson',
        email: 'david@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      subject: 'Upcoming Conference Details',
      preview: 'Here are the details for the upcoming industry conference. Registration deadline is next Friday.',
      isRead: true,
      isStarred: true,
      date: 'Jul 13',
      labels: ['Event'],
    },
    {
      id: '5',
      from: {
        name: 'Amanda Rivera',
        email: 'amanda@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
      },
      subject: 'Your Invoice #2347',
      preview: 'Your invoice for July services has been generated. Please find attached the detailed breakdown.',
      isRead: true,
      isStarred: false,
      date: 'Jul 10',
      labels: ['Finance'],
    },
  ]);

  const getFilteredEmails = () => {
    let filtered = [...emails];
    
    if (selectedTab === 'inbox') {
    } else if (selectedTab === 'starred') {
      filtered = filtered.filter(email => email.isStarred);
    } else if (selectedTab === 'sent') {
      filtered = [];
    } else if (selectedTab === 'drafts') {
      filtered = [];
    } else if (selectedTab === 'trash') {
      filtered = [];
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        email => 
          email.subject.toLowerCase().includes(query) || 
          email.preview.toLowerCase().includes(query) ||
          email.from.name.toLowerCase().includes(query) ||
          email.from.email.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const toggleStar = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id 
        ? { ...email, isStarred: !email.isStarred } 
        : email
    ));
  };

  const markAsRead = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id 
        ? { ...email, isRead: true } 
        : email
    ));
  };

  const deleteEmail = (id: string) => {
    setEmails(emails.filter(email => email.id !== id));
    toast({
      title: "Email deleted",
      description: "The email has been moved to trash",
    });
  };

  const composeEmail = () => {
    toast({
      title: "New email",
      description: "Compose email feature coming soon",
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing",
      description: "Checking for new emails...",
    });
  };

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
          <div className="lg:col-span-1 dashboard-card p-4 animate-slide-up opacity-0">
            <Button 
              onClick={composeEmail} 
              className="w-full mb-4 justify-start gap-2"
              variant="default"
            >
              <MailPlus className="h-4 w-4" />
              Compose
            </Button>
            
            <Tabs 
              defaultValue="inbox" 
              orientation="vertical" 
              className="w-full"
              onValueChange={setSelectedTab}
              value={selectedTab}
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
                    <Badge variant="secondary">{emails.filter(e => !e.isRead).length}</Badge>
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
              
              <TabsContent value="inbox" className="mt-0 hidden lg:block"></TabsContent>
              <TabsContent value="starred" className="mt-0 hidden lg:block"></TabsContent>
              <TabsContent value="sent" className="mt-0 hidden lg:block"></TabsContent>
              <TabsContent value="drafts" className="mt-0 hidden lg:block"></TabsContent>
              <TabsContent value="trash" className="mt-0 hidden lg:block"></TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-4 dashboard-card p-4 animate-slide-up opacity-0 animation-delay-100">
            <div className="flex items-center mb-4 gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="icon" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            <Tabs value={selectedTab}>
              <TabsContent value={selectedTab} className="m-0">
                <div className="space-y-1">
                  {getFilteredEmails().length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No emails found</p>
                    </div>
                  ) : (
                    getFilteredEmails().map((email) => (
                      <div
                        key={email.id}
                        className={`
                          group relative p-3 rounded-lg cursor-pointer transition-colors
                          ${email.isRead ? 'bg-transparent' : 'bg-blue-50 dark:bg-blue-950/20'}
                          hover:bg-slate-100 dark:hover:bg-slate-800
                        `}
                        onClick={() => markAsRead(email.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <Avatar>
                              <img src={email.from.avatar} alt={email.from.name} />
                            </Avatar>
                          </div>
                          
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-medium truncate ${email.isRead ? '' : 'font-bold'}`}>
                                {email.from.name}
                              </p>
                              <p className="text-xs text-muted-foreground">{email.date}</p>
                            </div>
                            
                            <p className={`text-sm truncate ${email.isRead ? '' : 'font-semibold'}`}>
                              {email.subject}
                            </p>
                            
                            <p className="text-xs text-muted-foreground truncate">
                              {email.preview}
                            </p>
                            
                            {email.labels && email.labels.length > 0 && (
                              <div className="flex gap-1 mt-1">
                                {email.labels.map(label => (
                                  <Badge key={label} variant="outline" className="text-xs">
                                    {label}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              className={`text-yellow-500 ${email.isStarred ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStar(email.id);
                              }}
                            >
                              <Star className="h-4 w-4" fill={email.isStarred ? "currentColor" : "none"} />
                            </button>
                            
                            <button
                              className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteEmail(email.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <Separator className="mt-3" />
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmailPage;
