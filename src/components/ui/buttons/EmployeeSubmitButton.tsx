import React, { useContext } from 'react';

import { ThemeContext } from '@components/Layouts/ThemeProvider';

import styles from './buttons.module.scss';

interface EmployeeSubmitButtonProps {
  onClick: () => void;
  title: string;
}

export const EmployeeSubmitButton: React.FC<EmployeeSubmitButtonProps> = ({
  onClick,
  title,
}) => {
  const { activeTextTheme } = useContext(ThemeContext);

  return (
    <button
      type='submit'
      onClick={onClick}
      className={styles.employeeSubmitButton}
      style={{ color: activeTextTheme }}
    >
      {title}
    </button>
  );
};
