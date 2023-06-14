import React from 'react';

import styles from './employeeInput.module.scss';

interface EmployeeInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => string;
  placeholder: string;
}

export const EmployeeInput: React.FC<EmployeeInputProps> = ({
  onChange,
  value,
  placeholder,
}) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.employeeInput}
    />
  );
};
