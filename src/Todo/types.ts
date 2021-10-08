import { AxiosResponse } from 'axios';
import { FormikState } from 'formik';

export interface IFormTodo {
  title: string;
  checked: boolean;
}

export interface ITodo extends IFormTodo {
  id: string;
}

export interface ITodoVariables {
  todo: IFormTodo;
}

export type TTodoResponse = AxiosResponse<ITodo>;

export interface IFormTodoFormikHelpers {
  resetForm: (nextState?: Partial<FormikState<IFormTodo>>) => void;
  setSubmitting: (isSubmitting: boolean) => void;
}

export interface ITodoFormikHelpers {
  resetForm: (nextState?: Partial<FormikState<ITodo>>) => void;
  setSubmitting: (isSubmitting: boolean) => void;
}
