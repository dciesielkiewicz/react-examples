import { FormikState } from 'formik';

export interface INewTodo {
  title: string;
  checked: boolean;
}

export interface ITodo extends INewTodo {
  id: string;
}

export interface INewTodoFormikHelpers {
  resetForm: (nextState?: Partial<FormikState<INewTodo>>) => void;
  setSubmitting: (isSubmitting: boolean) => void;
}

export interface ITodoFormikHelpers {
  resetForm: (nextState?: Partial<FormikState<ITodo>>) => void;
  setSubmitting: (isSubmitting: boolean) => void;
}
