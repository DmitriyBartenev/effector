import React, { useContext } from 'react';

import { ThemeContext } from '@components/Layouts/ThemeProvider';

import styles from './employeeInput.module.scss';

interface EmployeeInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => string | void;
  placeholder: string;
  favourite?: boolean;
}

export const EmployeeInput: React.FC<EmployeeInputProps> = ({
  onChange,
  value,
  placeholder,
  favourite,
}) => {
  const { activeTheme } = useContext(ThemeContext);

  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.employeeInput}
      style={{ color: favourite ? 'rgb(246, 192, 3)' : activeTheme.text }}
    />
  );
};
