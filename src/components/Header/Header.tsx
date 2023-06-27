'use client';
import React, { useContext } from 'react';

import { ThemeContext } from '@components/Layouts/ThemeProvider';
import { icons } from '@ui';

import styles from './header.module.scss';

const Header = () => {
  const themeContext = useContext(ThemeContext);

  const { DarkThemeIcon } = icons;
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
