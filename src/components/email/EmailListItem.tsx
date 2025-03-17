
import React from 'react';
import { Mail, Star, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export interface EmailData {
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

interface EmailListItemProps {
  email: EmailData;
  onRead: (id: string) => void;
  onToggleStar: (id: string) => void;
  onDelete: (id: string) => void;
}

const EmailListItem: React.FC<EmailListItemProps> = ({ 
  email, 
  onRead, 
  onToggleStar, 
  onDelete 
}) => {
  return (
    <div
      key={email.id}
      className={`
        group relative p-3 rounded-lg cursor-pointer
        ${email.isRead ? 'bg-transparent' : 'bg-blue-50 dark:bg-blue-950/20'}
        hover:bg-slate-100 dark:hover:bg-slate-800
      `}
      onClick={() => onRead(email.id)}
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
              onToggleStar(email.id);
            }}
          >
            <Star className="h-4 w-4" fill={email.isStarred ? "currentColor" : "none"} />
          </button>
          
          <button
            className="text-red-500 opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(email.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <Separator className="mt-3" />
    </div>
  );
};

export default EmailListItem;
