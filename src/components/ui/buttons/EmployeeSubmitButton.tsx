import React from 'react';

import styles from './buttons.module.scss';

interface EmployeeSubmitButtonProps {
  onClick: () => void;
  title: string;
}

export const EmployeeSubmitButton: React.FC<EmployeeSubmitButtonProps> = ({
  onClick,
  title,
}) => {
  return (
    <button
      type='submit'
      onClick={onClick}
      className={styles.employeeSubmitButton}
    >
      {title}
    </button>
  );
};
