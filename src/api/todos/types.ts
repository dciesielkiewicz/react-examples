import { AxiosResponse } from 'axios';

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
