import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';

import {
  ITodo,
  fetchTodos,
  QueryKey,
} from '../../api';

export const useTodos = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data: todos = [], isLoading } = useQuery<ITodo[]>(
    QueryKey.Todos,
    fetchTodos,
    {
      onError: () => {
        enqueueSnackbar('Error while fetching todos', { variant: 'error' })
      }
    }
  );

  return {
    isLoading,
    todos,
  };
};
