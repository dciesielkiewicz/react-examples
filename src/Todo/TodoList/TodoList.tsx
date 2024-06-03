import { useState } from 'react';

import { Loader } from '../../components';
import { useModal } from '../../hooks';

import { ITodo } from '../../api';
import { AddTodo } from '../AddTodo';
import { DeleteTodoModal } from '../DeleteTodoModal';
import { TodoItem } from '../TodoItem';

import { useTodos } from './useTodos';

export const TodoList = () => {
  const [deleteTodoItem, setDeleteTodoItem] = useState<ITodo | undefined>();
  const {
    isLoading,
    todos,
  } = useTodos();
  const { closeModal, isOpened, openModal } = useModal();

  const handleDeleteTodoClick = (todo: ITodo) => {
    setDeleteTodoItem(todo);
    openModal();
  }

  if (isLoading) return <Loader />;

  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          handleDeleteTodoClick={handleDeleteTodoClick}
          todo={todo}
        />
      ))}
      <AddTodo />
      {deleteTodoItem && (
        <DeleteTodoModal
          closeModal={closeModal}
          isOpened={isOpened}
          todo={deleteTodoItem}
        />
      )}
    </>
  );
};
