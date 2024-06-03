import { useMutation, useQueryClient } from 'react-query';

import { useSnackbar } from 'notistack';
import { ITodo, QueryKey, deleteTodo as deleteTodoRequest } from '../../api';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: deleteTodo, isLoading } = useMutation<void, unknown, Pick<ITodo, 'id'>>(deleteTodoRequest, {
    onSuccess: async (_response: void, variables: Pick<ITodo, 'id'>) => {
      const todos = queryClient.getQueryData<ITodo[]>(QueryKey.Todos) || [];
      queryClient.setQueryData(QueryKey.Todos, todos.filter((todo) => todo.id !== variables.id));
    },
    onError: () => {
      enqueueSnackbar('Error while deleting todo', { variant: 'error' });
    }
  });

  return { deleteTodo, isLoading };
};
