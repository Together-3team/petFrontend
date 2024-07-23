import { queryOptions, QueryClient, useQueryClient, useMutation } from '@tanstack/react-query';
import { UserId, userApi } from './api';

const keys = {
  user: () => ['user'],
};

const queryClient = new QueryClient();

export const userQueries = {
  getQueryKey: keys.user,
  removeQuery: () => queryClient.removeQueries({ queryKey: userQueries.getQueryKey() }),
  queryOptions: (id: UserId) => {
    return queryOptions({
      queryKey: [userQueries.getQueryKey(), id],
      queryFn: () => userApi.getUserData(id),
    });
  },
  prefetchQuery: (id: UserId) => {
    queryClient.prefetchQuery(userQueries.queryOptions(id));
  },

  useEditUserData: (id: UserId) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: userData => userApi.put(id, userData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: userQueries.getQueryKey() });
        queryClient.invalidateQueries({ queryKey: keys.user() });
      },
    });
  },
};
