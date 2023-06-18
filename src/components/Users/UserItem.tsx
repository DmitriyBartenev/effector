import React from 'react';

import { toggleEmployeeById, removeEmployeeById } from '../../effector/store';

import { FavouriteEmployeeIcon } from '@ui/icons/FavouriteEmployeeIcon';
import { EmployeeSubmitButton } from '@ui/buttons/EmployeeSubmitButton';

import styles from './users.module.scss';

interface UserItemProps {
  id: number;
  fullName: string;
  favourite: boolean;
  activeTextTheme: string;
}

const UserItem: React.FC<UserItemProps> = ({
  favourite,
  fullName,
  id,
  activeTextTheme,
}) => {
  return (
    <li style={{ color: favourite ? '#F6C026' : activeTextTheme }}>
      <span>{fullName}</span>
      <div className={styles.employee_actions}>
        <FavouriteEmployeeIcon
          favourite={favourite}
          toggleEmployeeById={() => toggleEmployeeById(id)}
        />
        <EmployeeSubmitButton
          onClick={() => removeEmployeeById(id)}
          title='Delete'
        />
      </div>
    </li>
  );
};

export default UserItem;
