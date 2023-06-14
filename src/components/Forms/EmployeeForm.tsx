'use client';
import React from 'react';
import { useStore } from 'effector-react';

import $store, { addEmployee, setNewEmployee } from '../../effector/store';

import styles from './employeeForm.module.scss';

interface EmployeeFormProps {
  header: string;
  title: string;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ title, header }) => {
  const store = useStore($store);

  return (
    <form
      className={styles.employeeForm}
      onSubmit={(event) => event.preventDefault()}
    >
      <h1>{header}</h1>
      <div className={styles.employeeFormContainer}>
        <input
          type='text'
          placeholder='Employee Full Name'
          value={store.newEmployeeFullName}
          onChange={(event) => setNewEmployee(event.target.value)}
        />
        <button type='submit' onClick={() => addEmployee()}>
          {title}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
