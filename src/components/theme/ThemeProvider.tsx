
import { RENDER_COMPONENT_TAG_NAME, RENDER_DIV_ID } from '@/RenderConfig';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme in localStorage or use system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', theme);

    // Add or remove dark class to shadow root or document element
    const updateTheme = () => {
      const root = document.querySelector(`:root`);
      const shadowRoot = document.querySelector(RENDER_COMPONENT_TAG_NAME)?.shadowRoot;

      if (shadowRoot) {
        // We're inside a web component, update the shadow root
        if (theme === 'dark') {
          shadowRoot.getElementById(RENDER_DIV_ID).classList.add('dark');
        } else {
          shadowRoot.getElementById(RENDER_DIV_ID).classList.remove('dark');
        }
      } else if (root) {
        // We're in a regular document, update the html element
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    updateTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
