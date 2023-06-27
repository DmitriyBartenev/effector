'use client';
import React from 'react';
import { useStore } from 'effector-react';

import $store, { addEmployee, setNewEmployee } from '../../effector/store';

import { buttons, inputs } from '@ui';

import styles from './employeeForm.module.scss';

const EmployeeForm: React.FC = () => {
  const store = useStore($store);
  const { EmployeeSubmitButton } = buttons;
  const { EmployeeInput } = inputs;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): string =>
    setNewEmployee(event.target.value);

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    addEmployee();
  };

  return (
    <form className={styles.employeeForm} onSubmit={onSubmit}>
      <h1>Employees</h1>
      <div className={styles.employeeFormContainer}>
        <EmployeeInput
          onChange={onChange}
          value={store.newEmployeeFullName}
          placeholder='Employee Full Name'
        />
        <EmployeeSubmitButton title='Add Employee' type='submit' />
      </div>
    </form>
  );
};

export default EmployeeForm;
