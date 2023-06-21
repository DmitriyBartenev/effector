'use client';

import React, { createContext, useState } from 'react';

interface IThemeContext {
  activeTheme: {
    text: string;
    background: string;
  };
  toggleActiveTheme: () => void;
}

const themes = {
  background: {
    light: '#f3e8eb',
    dark: '#433e49',
  },
  text: {
    light: '#f3e8eb',
    dark: '#433e49',
  },
};

export const ThemeContext = createContext<IThemeContext>({
  activeTheme: {
    text: themes.text.dark,
    background: themes.background.light,
  },
  toggleActiveTheme: () => undefined,
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTheme, setActiveTheme] = useState({
    text: themes.text.dark,
    background: themes.background.light,
  });

  const toggleActiveTheme = () => {
    if (activeTheme.background === themes.background.light) {
      setActiveTheme({
        text: themes.text.light,
        background: themes.background.dark,
      });
      document.body.style.backgroundColor = themes.background.dark;
    } else {
      setActiveTheme({
        text: themes.text.dark,
        background: themes.background.light,
      });
      document.body.style.backgroundColor = themes.background.light;
    }
  };

  const mainSectionStyle = {
    backgroundColor: activeTheme.background,
    color: activeTheme.text,
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, toggleActiveTheme }}>
      <main style={mainSectionStyle}>{children}</main>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
