import React, { useState } from 'react';

import {
  toggleEmployeeById,
  removeEmployeeById,
  updateEmployeeById,
} from '../../effector/store';

import { EmployeeInput } from '@components/ui/inputs/EmployeeInput';
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
  const [editMode, setEditMode] = useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateEmployeeById({ id, updatedFullName: event.target.value });
  };

  return (
    <li style={{ color: favourite ? '#F6C026' : activeTextTheme }}>
      {editMode ? (
        <EmployeeInput value={fullName} onChange={onChange} placeholder='' />
      ) : (
        <span>{fullName}</span>
      )}
      <div className={styles.employee_actions}>
        <FavouriteEmployeeIcon
          favourite={favourite}
          toggleEmployeeById={() => toggleEmployeeById(id)}
        />
        <EmployeeSubmitButton
          onClick={() => removeEmployeeById(id)}
          title='Delete'
        />
        <EmployeeSubmitButton
          onClick={() => setEditMode((prev) => !prev)}
          title={editMode ? 'Save' : 'Edit'}
        />
      </div>
    </li>
  );
};

export default UserItem;
