'use client';

import React, { createContext, useState, useLayoutEffect } from 'react';

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

  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem('activeTheme');
    if (storedTheme) {
      const parsedTheme = JSON.parse(storedTheme);
      document.body.style.backgroundColor = parsedTheme.background;
      setActiveTheme(parsedTheme);
    }
  }, []);

  const toggleActiveTheme = () => {
    const nextBackgroundColor =
      activeTheme.background === themes.background.light
        ? themes.background.dark
        : themes.background.light;

    const nextTextColor =
      activeTheme.text === themes.text.dark
        ? themes.text.light
        : themes.text.dark;

    const theme = {
      text: nextTextColor,
      background: nextBackgroundColor,
    };

    const themeJSON = JSON.stringify(theme);
    localStorage.setItem('activeTheme', themeJSON);
    setActiveTheme(theme);
    document.body.style.backgroundColor = nextBackgroundColor;
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
