'use client';
import React, { useContext } from 'react';
import { useStore } from 'effector-react';

import $store from '../../effector/store';

import { ThemeContext } from '@components/Layouts/ThemeProvider';
import EmployeeForm from '@components/Forms/EmployeeForm';
import UserItem from './UserItem';

import styles from './users.module.scss';

const Users: React.FC = () => {
  const store = useStore($store);
  const { activeTextTheme } = useContext(ThemeContext);

  return (
    <section>
      <EmployeeForm />
      <div className={styles.usersList}>
        <ul>
          {store.employees.map((employee) => (
            <UserItem
              key={employee.id}
              {...employee}
              activeTextTheme={activeTextTheme}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Users;
