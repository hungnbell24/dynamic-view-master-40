
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  const buttonClasses = cn(
    "rounded-full transition-colors duration-200",
    isDarkTheme 
      ? 'bg-slate-800 text-yellow-300 hover:text-yellow-200 hover:bg-slate-700 border-slate-700' 
      : 'bg-slate-200 text-slate-900 hover:text-slate-700 hover:bg-slate-300 border-slate-300'
  );

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={buttonClasses}
      aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

export default ThemeToggle;
