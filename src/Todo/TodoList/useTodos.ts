import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { INewTodo, INewTodoFormikHelpers, ITodo, ITodoFormikHelpers } from '../types';

export const useTodos = () => {
  const [loading, setLoading] = useState(true);
  const [loadingDeleteTodoId, setLoadingDeleteTodoId] = useState<ITodo['id'] | null>(null);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ITodo[]>('/todos');
      setTodos(response.data);
    } catch {
      enqueueSnackbar('Error while fetching todos', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todo: INewTodo, { resetForm, setSubmitting }: INewTodoFormikHelpers) => {
    try {
      const response = await axios.post<ITodo>('/todos', { todo });
      setTodos([...todos, response.data]);
      resetForm();
    } catch {
      enqueueSnackbar('Error while adding todo', { variant: 'error' });
      setSubmitting(false);
    }
  }

  const deleteTodo = async (todoId: ITodo['id']) => {
    setLoadingDeleteTodoId(todoId);
    try {
      await axios.delete<ITodo>(`/todos/${todoId}`);
      setTodos(todos.filter(({ id }) => id !== todoId));
    } catch {
      enqueueSnackbar('Error while deleting todo', { variant: 'error' });
    } finally {
      setLoadingDeleteTodoId(null);
    }
  }


  const updateTodo = async (todo: ITodo, { resetForm, setSubmitting }: ITodoFormikHelpers) => {
    const { id: todoId, ...updateParams } = todo;
    try {
      const resposnse = await axios.put<ITodo>(`/todos/${todoId}`, { todo: updateParams });
      const cloneTodos = [...todos];
      const index = todos.findIndex(({ id }) => id === todoId);
      cloneTodos[index] = resposnse.data;
      setTodos(cloneTodos);
      resetForm();
    } catch {
      enqueueSnackbar('Error while updating todo', { variant: 'error' });
      setSubmitting(false);
    }
  }

  const toggleTodo = async (todo: ITodo) => {
    const oldTodos = [...todos];
    const newTodos = [...todos];
    const { id: todoId, title, checked } = todo;
    const updateParams = { title, checked: !checked };
    const updatedTodo = { ...todo, checked: !checked };
    const index = todos.findIndex(({ id }) => id === todo.id);
    newTodos[index] = updatedTodo;
    setTodos(newTodos);
    try {
      await axios.put<ITodo>(`/todos/${todoId}`, { todo: updateParams });
    } catch {
      enqueueSnackbar('Error while toggling todo', { variant: 'error' });
      setTodos(oldTodos);
    }
  }


  useEffect(() => {
    fetchTodos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddTodoSubmit = (todo: INewTodo, formikHelpers: INewTodoFormikHelpers) => {
    addTodo(todo, formikHelpers);
  };

  const handleDeleteTodo = (todoId: ITodo['id']) => {
    deleteTodo(todoId)
  };

  const handleUpdateTodo = (todo: ITodo, formikHelpers: ITodoFormikHelpers) => updateTodo(todo, formikHelpers);

  const toggleTodoChecked = (todo: ITodo) => {
    toggleTodo(todo);
  }

  return {
    handleAddTodoSubmit,
    handleDeleteTodo,
    handleUpdateTodo,
    loading,
    loadingDeleteTodoId,
    toggleTodoChecked,
    todos,
  };
};
