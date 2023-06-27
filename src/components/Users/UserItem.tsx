import React, { useState } from 'react';

import {
  toggleEmployeeById,
  removeEmployeeById,
  updateEmployeeById,
} from '../../effector/store';

import { inputs, buttons, icons } from '@ui';

import styles from './users.module.scss';

interface UserItemProps {
  id: number;
  fullName: string;
  favourite: boolean;
  activeTheme: string;
}

const UserItem: React.FC<UserItemProps> = ({
  favourite,
  fullName,
  id,
  activeTheme,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const { EmployeeInput } = inputs;
  const { EmployeeSubmitButton } = buttons;
  const { FavouriteEmployeeIcon } = icons;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateEmployeeById({ id, updatedFullName: event.target.value });
  };

  const onSaveEditEmployee = () => {
    if (!fullName) return;

    setEditMode((prev) => !prev);
  };

  return (
    <li style={{ color: favourite ? '#F6C026' : activeTheme }}>
      {editMode ? (
        <EmployeeInput
          value={fullName}
          onChange={onChange}
          placeholder=''
          favourite={favourite}
        />
      ) : (
        <span>{fullName}</span>
      )}
      <div className={styles.employee_actions}>
        <button
          className={styles.employee_actions__toggleFavButton}
          onClick={() => toggleEmployeeById(id)}
        >
          <FavouriteEmployeeIcon favourite={favourite} />
        </button>
        <EmployeeSubmitButton
          onClick={() => removeEmployeeById(id)}
          title='Delete'
          type='button'
        />
        <EmployeeSubmitButton
          onClick={onSaveEditEmployee}
          title={editMode ? 'Save' : 'Edit'}
          type='button'
        />
      </div>
    </li>
  );
};

export default UserItem;
