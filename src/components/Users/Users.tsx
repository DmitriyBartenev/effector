import React from 'react';

import styles from './users.module.scss';

const Users: React.FC = () => {
  return (
    <div className={styles.usersList}>
      <ul>
        <li>User Name</li>
      </ul>
    </div>
  );
};

export default Users;
