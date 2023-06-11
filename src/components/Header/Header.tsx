import React from 'react';

import { DarkThemeIcon } from '@icons/DarkThemeIcon';

import styles from './header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <DarkThemeIcon />
      </div>
      <div>
        <p>Load</p>
      </div>
    </div>
  );
};

export default Header;
