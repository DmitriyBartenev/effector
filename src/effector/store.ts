import { createEvent, createStore, createEffect } from 'effector';
import axios from 'axios';
import type { IEmployee } from 'types/IEmployee';

const updateEmployee = (
  employees: IEmployee[],
  id: number,
  fullName: string
): IEmployee[] =>
  employees.map((employee) => ({
    ...employee,
    fullName: employee.id === id ? fullName : employee.fullName,
  }));

const toggleEmployee = (employees: IEmployee[], id: number): IEmployee[] =>
  employees.map((employee) => ({
    ...employee,
    favourite: employee.id === id ? !employee.favourite : employee.favourite,
  }));

const removeEmployee = (employees: IEmployee[], id: number): IEmployee[] =>
  employees.filter((employee) => employee.id !== id);

const addEmployeeToList = (
  employees: IEmployee[],
  fullName: string
): IEmployee[] => [
  ...employees,
  {
    id: Math.random(),
    fullName,
    favourite: false,
  },
];

type Store = {
  employees: IEmployee[];
  newEmployeeFullName: string;
};

export const setNewEmployee = createEvent<string>();
export const addEmployee = createEvent();
export const removeEmployeeById = createEvent<number>();
export const toggleEmployeeById = createEvent<number>();
export const updateEmployeeById = createEvent<{
  id: number;
  updatedFullName: string;
}>();
export const loadEmployees = createEffect<string, IEmployee[]>(
  async (url: string): Promise<IEmployee[]> => {
    const res = await axios.get<IEmployee[]>(url);
    return res.data;
  }
);

export default createStore<Store>({
  employees: [],
  newEmployeeFullName: '',
})
  .on(loadEmployees.doneData, (state, employees) => ({
    ...state,
    employees,
  }))
  .on(setNewEmployee, (state, newEmployeeFullName) => ({
    ...state,
    newEmployeeFullName,
  }))
  .on(addEmployee, (state) => ({
    ...state,
    newEmployeeFullName: '',
    employees: addEmployeeToList(state.employees, state.newEmployeeFullName),
  }))
  .on(removeEmployeeById, (state, employeeId: number) => ({
    ...state,
    employees: removeEmployee(state.employees, employeeId),
  }))
  .on(toggleEmployeeById, (state, employeeId: number) => ({
    ...state,
    employees: toggleEmployee(state.employees, employeeId),
  }))
  .on(updateEmployeeById, (state, { id, updatedFullName }) => ({
    ...state,
    employees: updateEmployee(state.employees, id, updatedFullName),
  }));
