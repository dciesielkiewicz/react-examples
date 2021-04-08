import { useState } from 'react';

import { Loader } from 'components';
import { useModal } from 'hooks';

import { AddTodo } from '../AddTodo';
import { DeleteTodoModal } from '../DeleteTodoModal';
import { ITodo } from '../types';

import { TodoItem } from './TodoItem';
import { useTodos } from './useTodos';

export const TodoList = () => {
  const [deleteTodoItem, setDeleteTodoItem] = useState<ITodo | undefined>();
  const {
    handleAddTodoSubmit,
    handleDeleteTodo,
    handleUpdateTodo,
    loadingDeleteTodoId,
    loading,
    toggleTodoChecked,
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
          handleUpdateTodo={handleUpdateTodo}
          toggleTodoChecked={toggleTodoChecked}
          todo={todo}
        />
      ))}
      <AddTodo handleAddTodoSubmit={handleAddTodoSubmit} />
      {deleteTodoItem && (
        <DeleteTodoModal
          closeModal={closeModal}
          handleDeleteTodo={handleDeleteTodo}
          isOpened={isOpened}
          todo={deleteTodoItem}
        />
      )}
    </>
  );
};
