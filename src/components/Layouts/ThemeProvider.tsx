'use client';

import React, { createContext } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const themes = {
  dark: '#333',
  light: '#FFF',
};

export const ThemeContext = createContext(themes);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
