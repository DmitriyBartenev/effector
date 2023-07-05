import React from 'react';

import styles from './spinner.module.scss';

interface LoadingSpinnerProps {
  activeTheme: {
    text: string;
    background: string;
  };
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  activeTheme,
}) => {
  return (
    <div
      className={styles.loadingSpinner}
      style={{
        border: `5px solid ${activeTheme.text}`,
        borderTopColor: activeTheme.background,
      }}
    ></div>
  );
};
