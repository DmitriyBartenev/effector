'use client';
import React, { useContext } from 'react';

import { ThemeContext } from '@components/Layouts/ThemeProvider';
import { DarkThemeIcon } from '@components/ui/icons/DarkThemeIcon';

import styles from './header.module.scss';

const Header = () => {
  const themeContext = useContext(ThemeContext);

  const { toggleActiveTheme } = themeContext;

  return (
    <header className={styles.header}>
      <div onClick={toggleActiveTheme}>
        <DarkThemeIcon />
      </div>
    </header>
  );
};

export default Header;
