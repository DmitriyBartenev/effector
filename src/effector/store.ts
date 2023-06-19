import { createEvent, createStore } from 'effector';

export interface Employee {
  id: number;
  fullName: string;
  favourite: boolean;
}

const updateEmployee = (
  employees: Employee[],
  id: number,
  fullName: string
): Employee[] =>
  employees.map((employee) => ({
    ...employee,
    fullName: employee.id === id ? fullName : employee.fullName,
  }));

const toggleEmployee = (employees: Employee[], id: number): Employee[] =>
  employees.map((employee) => ({
    ...employee,
    favourite: employee.id === id ? !employee.favourite : employee.favourite,
  }));

const removeEmployee = (employees: Employee[], id: number): Employee[] =>
  employees.filter((employee) => employee.id !== id);

const addEmployeeToList = (
  employees: Employee[],
  fullName: string
): Employee[] => [
  ...employees,
  {
    id: Math.random(),
    fullName,
    favourite: false,
  },
];

type Store = {
  employees: Employee[];
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

export default createStore<Store>({
  employees: [],
  newEmployeeFullName: '',
})
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
