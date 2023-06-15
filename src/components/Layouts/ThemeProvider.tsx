'use client';

import React, { createContext } from 'react';

interface IThemeContext {
  activeTheme: string;
  toggleActiveTheme?: () => void;
}

const themes = {
  light: '#FFF',
  dark: '#333',
};

export const ThemeContext = createContext<IThemeContext>({
  activeTheme: themes.light,
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTheme, setActiveTheme] = React.useState(themes.light);

  const toggleActiveTheme = () => {
    if (activeTheme === themes.light) {
      setActiveTheme(themes.dark);
    } else {
      setActiveTheme(themes.light);
    }
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, toggleActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
