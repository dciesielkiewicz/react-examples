import { useMutation, useQueryClient } from 'react-query';

import { useSnackbar } from 'notistack';
import { ITodo, QueryKey, updateTodo as updateTodoRequest } from '../../api';

type TUseToggleTodoContext = { previousTodos: ITodo[] } | undefined;

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: toggleTodo } = useMutation<ITodo, unknown, ITodo, TUseToggleTodoContext>(updateTodoRequest, {
    onMutate: async (newTodo: ITodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [QueryKey.Todos, newTodo.id] })
  
      // Optimistically update to the new value
      const previousTodos = queryClient.getQueryData<ITodo[]>(QueryKey.Todos) || [];
      queryClient.setQueryData(QueryKey.Todos, previousTodos.map((todo) => {
        if (newTodo.id === todo.id) return newTodo;
        return todo;
      }));
  
      // Return a context with the previous and new todo
      return { previousTodos }
    },
    // If the mutation fails, use the context we returned above
    onError: (_error, _newTodo, context: TUseToggleTodoContext) => {
      enqueueSnackbar('Error while updating todo', { variant: 'error' });
      queryClient.setQueryData(QueryKey.Todos, context?.previousTodos)
    },
  });

  return { toggleTodo };
};

