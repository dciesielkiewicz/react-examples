import { FormikState } from 'formik';

export interface INewTodo {
  title: string;
}

export interface ITodo extends INewTodo {
  id: number;
  checked: boolean;
}

export type TNewTodoResetForm = (nextState?: Partial<FormikState<INewTodo>>) => void;
export type TTodoResetForm = (nextState?: Partial<FormikState<ITodo>>) => void;
