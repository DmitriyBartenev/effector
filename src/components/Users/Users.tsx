'use client';
import React from 'react';

import { useStore } from 'effector-react';

import $store, {
  removeEmployeeById,
  toggleEmployeeById,
} from '../../effector/store';

import styles from './users.module.scss';

const Users: React.FC = () => {
  const store = useStore($store);

  return (
    <div className={styles.usersList}>
      <ul>
        {store.employees.map((employee) => (
          <li
            key={employee.id}
            style={{ color: employee.favourite ? 'red' : 'blue' }}
          >
            <input
              type='checkbox'
              onClick={() => toggleEmployeeById(employee.id)}
            />
            <span>{employee.fullName}</span>
            <button onClick={() => removeEmployeeById(employee.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
