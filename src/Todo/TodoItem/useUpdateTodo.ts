import { useMutation, useQueryClient } from 'react-query';

import { useSnackbar } from 'notistack';
import { ITodo, QueryKey, updateTodo as updateTodoRequest } from '../../api';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: updateTodo } = useMutation<ITodo, unknown, ITodo>(updateTodoRequest, {
    onSuccess: async (updatedTodo: ITodo, variables: ITodo) => {
      const todos = queryClient.getQueryData<ITodo[]>(QueryKey.Todos) || [];
      queryClient.setQueryData(QueryKey.Todos, todos.map((todo) => {
        if (variables.id === todo.id) {
          return {
            ...updatedTodo,
            id: variables.id,
          }
        }
        return todo;
      }));
    },
    onError: () => {
      enqueueSnackbar('Error while updating todo', { variant: 'error' });
    }
  });

  return { updateTodo };
};


