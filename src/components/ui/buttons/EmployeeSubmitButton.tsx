import React, { useContext } from 'react';

import { ThemeContext } from '@components/Layouts/ThemeProvider';

import styles from './buttons.module.scss';

interface EmployeeSubmitButtonProps {
  onClick?: () => void;
  title: string;
  type: 'submit' | 'button' | 'reset';
}

export const EmployeeSubmitButton: React.FC<EmployeeSubmitButtonProps> = ({
  onClick,
  type,
  title,
}) => {
  const { activeTheme } = useContext(ThemeContext);

  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.employeeSubmitButton}
      style={{ color: activeTheme.text }}
    >
      {title}
    </button>
  );
};
