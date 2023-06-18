'use client';

import React, { createContext } from 'react';

interface IThemeContext {
  activeTheme: string;
  activeTextTheme: string;
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
  activeTheme: themes.background.light,
  activeTextTheme: themes.text.light,
  toggleActiveTheme: () => undefined,
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTheme, setActiveTheme] = React.useState(themes.background.light);
  const [activeTextTheme, setActiveTextTheme] = React.useState(
    themes.text.dark
  );

  const toggleActiveTheme = () => {
    if (activeTheme === themes.background.light) {
      setActiveTheme(themes.background.dark);
      setActiveTextTheme(themes.text.light);
      document.body.style.backgroundColor = themes.background.dark;
    } else {
      setActiveTheme(themes.background.light);
      setActiveTextTheme(themes.text.dark);
      document.body.style.backgroundColor = themes.background.light;
    }
  };

  const mainSectionStyle = {
    backgroundColor: activeTheme,
    color: activeTextTheme,
  };

  return (
    <ThemeContext.Provider
      value={{ activeTheme, activeTextTheme, toggleActiveTheme }}
    >
      <main style={mainSectionStyle}>{children}</main>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
