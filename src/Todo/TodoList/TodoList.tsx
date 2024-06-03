import { useState } from 'react';

import { Loader } from '../../components';
import { useModal } from '../../hooks';

import { AddTodo } from '../AddTodo';
import { DeleteTodoModal } from '../DeleteTodoModal';
import { TodoItem } from '../TodoItem';
import { ITodo } from '../types';

import { useTodos } from './useTodos';

export const TodoList = () => {
  const [deleteTodoItem, setDeleteTodoItem] = useState<ITodo | undefined>();
  const {
    addTodo,
    deleteTodo,
    updateTodo,
    loadingDeleteTodoId,
    loading,
    toggleTodo,
    todos,
  } = useTodos();
  const { closeModal, isOpened, openModal } = useModal();

  const handleDeleteTodoClick = (todo: ITodo) => {
    setDeleteTodoItem(todo);
    openModal();
  }

  if (loading) return <Loader />;

  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          loadingDeleteTodoId={loadingDeleteTodoId}
          handleDeleteTodoClick={handleDeleteTodoClick}
          toggleTodo={toggleTodo}
          todo={todo}
          updateTodo={updateTodo}
        />
      ))}
      <AddTodo addTodo={addTodo} />
      {deleteTodoItem && (
        <DeleteTodoModal
          closeModal={closeModal}
          deleteTodo={deleteTodo}
          isOpened={isOpened}
          todo={deleteTodoItem}
        />
      )}
    </>
  );
};
