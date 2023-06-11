import React from 'react';

import styles from './employeeForm.module.scss';

interface EmployeeFormProps {
  header: string;
  title: string;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ title, header }) => {
  return (
    <form className={styles.employeeForm}>
      <h1>{header}</h1>
      <div className={styles.employeeFormContainer}>
        <input type='text' placeholder='Employee name' />
        <button type='submit'>{title}</button>
      </div>
    </form>
  );
};

export default EmployeeForm;
