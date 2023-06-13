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
  }));
