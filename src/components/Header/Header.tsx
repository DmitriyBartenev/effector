'use client';
import React, { useContext } from 'react';

import { loadEmployees } from '../../effector/store';

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
      <div
        onClick={() =>
          loadEmployees(
            'https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json'
          )
        }
      >
        <p>Load Employees</p>
      </div>
    </header>
  );
};

export default Header;
