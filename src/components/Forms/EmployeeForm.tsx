'use client';
import React from 'react';
import { useStore } from 'effector-react';

import $store, { addEmployee, setNewEmployee } from '../../effector/store';

import { EmployeeSubmitButton } from '@components/ui/buttons/EmployeeSubmitButton';
import { EmployeeInput } from '@components/ui/inputs/EmployeeInput';

import styles from './employeeForm.module.scss';

const EmployeeForm: React.FC = () => {
  const store = useStore($store);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): string =>
    setNewEmployee(event.target.value);

  return (
    <form
      className={styles.employeeForm}
      onSubmit={(event) => event.preventDefault()}
    >
      <h1>Employees</h1>
      <div className={styles.employeeFormContainer}>
        <EmployeeInput
          onChange={onChange}
          value={store.newEmployeeFullName}
          placeholder='Employee Full Name'
        />
        <EmployeeSubmitButton
          onClick={() => addEmployee()}
          title='Add Employee'
        />
      </div>
    </form>
  );
};

export default EmployeeForm;
