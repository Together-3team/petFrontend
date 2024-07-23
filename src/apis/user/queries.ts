import { queryOptions, QueryClient, useQueryClient, useMutation } from '@tanstack/react-query';
import { UserId, userApi } from './api';

const keys = {
  users: () => ['users'],
  nickname: () => ['nickname'],
};

const queryClient = new QueryClient();

export const userQueries = {
  getQueryKey: keys.users,
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
        queryClient.invalidateQueries({ queryKey: keys.users() });
      },
    });
  },

  usePostUserData: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: userData => userApi.post(userData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: userQueries.getQueryKey() });
        queryClient.invalidateQueries({ queryKey: keys.users() });
      },
    });
  },

  useDeleteUserData: (id: UserId) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: userData => userApi.delete(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.users() });
      },
    });
  },
};

export const nicknameQueries = {
  getQueryKey: keys.nickname,
  useCheckNickname: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: data => userApi.checkNickname(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: nicknameQueries.getQueryKey() });
        queryClient.invalidateQueries({ queryKey: keys.nickname() });
      },
    });
  },
};
