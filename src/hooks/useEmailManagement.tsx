import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Email {
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

export const useEmailManagement = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
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
    
    // Filter by tab
    if (selectedTab === 'inbox') {
      // Keep all emails for inbox
    } else if (selectedTab === 'starred') {
      filtered = filtered.filter(email => email.isStarred);
    } else if (selectedTab === 'sent') {
      filtered = [];
    } else if (selectedTab === 'drafts') {
      filtered = [];
    } else if (selectedTab === 'trash') {
      filtered = [];
    }
    
    // Filter by search query
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

  const unreadCount = emails.filter(e => !e.isRead).length;

  return {
    emails,
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
  };
};
