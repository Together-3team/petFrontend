import { queryOptions, QueryClient } from '@tanstack/react-query';
import { UserId, userApi } from './api';

const key = {
  user: () => ['user'],
};

const queryClient = new QueryClient();

export const userQueries = {
  getQueryKey: key.user,
  removeQuery: () => queryClient.removeQueries({ queryKey: userQueries.getQueryKey() }),
  queryOptions: (id: UserId) => {
    return queryOptions({
      queryKey: [userQueries.getQueryKey(), id],
      queryFn: () => userApi.getUserData(id),
    });
  },
};
