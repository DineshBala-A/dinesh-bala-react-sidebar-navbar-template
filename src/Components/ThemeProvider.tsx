// src/contexts/ThemeContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark' | 'system'>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    return 'system'; // Default to system
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    updateTheme();
  }, [theme]);

  const updateTheme = ():void => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark && theme === 'dark') {
      return;
    } 
    document.documentElement.classList.toggle("dark");
  
  };

  // const updateTheme = () => {
  //   document.documentElement.classList.remove('dark', 'light');
  //   if (theme === 'dark') {
  //     document.documentElement.classList.add('dark');
  //   } else if (theme === 'light') {
  //     document.documentElement.classList.add('light');
  //   }
  // };

  useEffect(() => {
    const systemPreferenceDark = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
      if (theme === 'system') {
        document.documentElement.classList.remove('dark', 'light');
        if (event.matches) {
          document.documentElement.classList.add('dark');
        }
      }
    };

    systemPreferenceDark.addEventListener('change', handleChange);

    // Initial check on mount if theme is system
    if (theme === 'system') {
      if (systemPreferenceDark.matches) {
        document.documentElement.classList.add('dark');
      }
    }

    return () => {
      systemPreferenceDark.removeEventListener('change', handleChange);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};