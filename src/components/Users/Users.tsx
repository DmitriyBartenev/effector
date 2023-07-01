'use client';
import React, { useContext, useEffect } from 'react';
import { useStore } from 'effector-react';

import $store from '../../effector/store';
import { loadEmployees } from '../../effector/store';

import { ThemeContext } from '@components/Layouts/ThemeProvider';
import EmployeeForm from '@components/Forms/EmployeeForm';
import UserItem from './UserItem';

import styles from './users.module.scss';

const Users: React.FC = () => {
  const store = useStore($store);
  const pending = useStore(loadEmployees.pending);

  const { activeTheme } = useContext(ThemeContext);

  useEffect(() => {
    loadEmployees('http://localhost:8080/employees');
  }, []);

  return (
    <section>
      <EmployeeForm />
      <div className={styles.usersList}>
        <ul>
          {pending ? (
            <h1>Loading...</h1>
          ) : (
            store.employees.map((employee) => (
              <UserItem
                key={employee.id}
                {...employee}
                activeTheme={activeTheme.text}
              />
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default Users;
