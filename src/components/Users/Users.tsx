'use client';
import React from 'react';

import { useStore } from 'effector-react';

import $store from '../../effector/store';

import styles from './users.module.scss';

const Users: React.FC = () => {
  const store = useStore($store);

  return (
    <div className={styles.usersList}>
      <ul>
        {store.employees.map((employee) => (
          <li key={employee.id}>
            <input type='checkbox' />
            <span>{employee.fullName}</span>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
