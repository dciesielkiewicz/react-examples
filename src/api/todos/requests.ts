import axios from 'axios';

import { IFormTodo, ITodo, ITodoVariables, TTodoResponse } from './types';

export const fetchTodos = async () => {
  const { data } = await axios.get<ITodo[]>('/todos');
  return data
};

export const addTodo = async (todo: IFormTodo): Promise<ITodo> => {
  const { data } = await axios.post<ITodoVariables, TTodoResponse>('/todos', { todo });
  return data;
};

export const updateTodo = async ({ id, ...updateParams }: ITodo): Promise<ITodo> => {
  const { data } = await axios.put<ITodoVariables, TTodoResponse>(`/todos/${id}`, { todo: updateParams });
  return data;
};

export const deleteTodo = async ({ id }: Pick<ITodo, 'id'>): Promise<void> => axios.delete(`/todos/${id}`);
