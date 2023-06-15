'use client';
import React, { useContext } from 'react';

import { ThemeContext } from '@components/Layouts/ThemeProvider';

import { DarkThemeIcon } from '@components/ui/icons/DarkThemeIcon';

import styles from './header.module.scss';

const Header = () => {
  const theme = useContext(ThemeContext);

  return (
    <div
      className={styles.header}
      style={{ backgroundColor: `${theme.activeTheme}` }}
    >
      <div onClick={theme.toggleActiveTheme}>
        <DarkThemeIcon />
      </div>
      <div>
        <p>Load Employees</p>
      </div>
    </div>
  );
};

export default Header;
