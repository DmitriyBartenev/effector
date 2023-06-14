import React from 'react';

import { DarkThemeIcon } from '@components/ui/icons/DarkThemeIcon';

import styles from './header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <DarkThemeIcon />
      </div>
      <div>
        <p>Load Employees</p>
      </div>
    </div>
  );
};

export default Header;
