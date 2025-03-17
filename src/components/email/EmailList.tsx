
import React from 'react';
import { Mail } from 'lucide-react';
import EmailListItem, { EmailData } from './EmailListItem';

interface EmailListProps {
  emails: EmailData[];
  onRead: (id: string) => void;
  onToggleStar: (id: string) => void;
  onDelete: (id: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({ 
  emails, 
  onRead, 
  onToggleStar, 
  onDelete 
}) => {
  if (emails.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No emails found</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {emails.map(email => (
        <EmailListItem
          key={email.id}
          email={email}
          onRead={onRead}
          onToggleStar={onToggleStar}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EmailList;
