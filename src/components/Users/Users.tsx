'use client';
import React from 'react';

import { useStore } from 'effector-react';

import $store, {
  removeEmployeeById,
  toggleEmployeeById,
} from '../../effector/store';

import { FavouriteEmployeeIcon } from '@components/icons/FavouriteEmployeeIcon';

import styles from './users.module.scss';

const Users: React.FC = () => {
  const store = useStore($store);

  return (
    <div className={styles.usersList}>
      <ul>
        {store.employees.map((employee) => (
          <li
            key={employee.id}
            style={{ color: employee.favourite ? 'red' : '#433e49' }}
          >
            <span>{employee.fullName}</span>
            <div className={styles.employee_actions}>
              <FavouriteEmployeeIcon
                isFavourite={employee.favourite}
                toggleEmployeeById={() => toggleEmployeeById(employee.id)}
              />
              <button
                onClick={() => removeEmployeeById(employee.id)}
                className={styles.removeEmployeeButton}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
