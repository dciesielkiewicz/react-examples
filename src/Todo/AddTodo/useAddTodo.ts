import { useMutation, useQueryClient } from 'react-query';

import { useSnackbar } from 'notistack';
import { addTodo as addTodoRequest, IFormTodo, ITodo, QueryKey } from '../../api';

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: addTodo, isLoading } = useMutation<ITodo, unknown, IFormTodo>(addTodoRequest, {
    onSuccess: async (newTodo: ITodo) => {
      const todos = queryClient.getQueryData<ITodo[]>(QueryKey.Todos) || [];
      queryClient.setQueryData(QueryKey.Todos, [
        ...todos,
        newTodo
      ]);
    },
    onError: () => {
      enqueueSnackbar('Error while adding todo', { variant: 'error' });
    }
  });

  return { addTodo, isLoading };
};

