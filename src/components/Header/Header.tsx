'use client';
import React, { useContext } from 'react';

import { ThemeContext } from '@components/Layouts/ThemeProvider';

import { DarkThemeIcon } from '@components/ui/icons/DarkThemeIcon';

import styles from './header.module.scss';

const Header = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <div className={styles.header}>
      <div onClick={themeContext.toggleActiveTheme}>
        <DarkThemeIcon />
      </div>
      <div>
        <p>Load Employees</p>
      </div>
    </div>
  );
};

export default Header;
