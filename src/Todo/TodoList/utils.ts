import { ITodo } from '../types';

export const generateId = (todos: ITodo[]) => {
  const [maxIdTodo] = todos.sort((a, b) => b.id - a.id);
  return (maxIdTodo?.id || 0) + 1;
};