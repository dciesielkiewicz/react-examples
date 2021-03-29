import { useState } from 'react';
import { generateId } from './utils';
import { INewTodo, ITodo, TNewTodoResetForm, TTodoResetForm } from '../types';

export const useTodos = () => {
  const [todos, setTodos] = useState<ITodo[]>(
    [{
      id: 1,
      title: 'Todo 1',
      checked: false,
    },
    {
      id: 2,
      title: 'Todo 2',
      checked: false,
    }]
  );
  const loading = false;

  const handleAddTodoSubmit = (todo: INewTodo, resetForm: TNewTodoResetForm) => {
    setTodos([...todos, { ...todo, id: generateId(todos), checked: false }]);
    resetForm();
  };

  const handleDeleteTodo = (todoId: ITodo['id']) => {
    setTodos(todos.filter(({ id }) => id !== todoId));
  };

  const handleUpdateTodo = (todo: ITodo, resetForm: TTodoResetForm) => {
    const newTodos = [...todos];
    const index = todos.findIndex(({ id }) => id === todo.id);
    newTodos[index] = todo;
    setTodos(newTodos);
    resetForm();
  };

  const toggleTodoChecked = (todo: ITodo) => {
    const newTodos = [...todos];
    const index = todos.findIndex(({ id }) => id === todo.id);
    newTodos[index] = {
      ...todo,
      checked: !todo.checked,
    };
    setTodos(newTodos);
  }

  return {
    handleAddTodoSubmit,
    handleDeleteTodo,
    handleUpdateTodo,
    loading,
    toggleTodoChecked,
    todos,
  };
};
