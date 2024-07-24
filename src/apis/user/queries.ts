import { useQueryClient, useMutation, queryOptions } from '@tanstack/react-query';
import { UserEditParams, fetchMyData, userApi } from './api';
import { queryClient } from '@/utils/queryClient';

const key = {
  myData: () => ['myData'],
  users: (id: number) => ['users', id],
  nickname: () => ['nickname'],
};

export const myQueries = {
  getQueryKey: () => key.myData(),
  removeQuery: () => queryClient.removeQueries({ queryKey: myQueries.getQueryKey() }),
  queryOptions: () => {
    return {
      queryKey: myQueries.getQueryKey(),
      queryFn: () => fetchMyData(),
    };
  },
  setQueryDataEmpty: () => {
    queryClient.setQueryData(myQueries.getQueryKey(), null);
  },
  prefetchQuery: async () => {
    const { queryKey, queryFn } = myQueries.queryOptions();
    await queryClient.prefetchQuery({ queryKey, queryFn });
  },
};

export const userQueries = {
  getQueryKey: (id: number) => key.users(id),
  removeQuery: (id: number) => queryClient.removeQueries({ queryKey: userQueries.getQueryKey(id) }),
  queryOptions: (id: number) => {
    return {
      queryKey: userQueries.getQueryKey(id),
      queryFn: () => userApi.getUserData(id),
    };
  },
  prefetchQuery: (id: number) => {
    queryClient.prefetchQuery(userQueries.queryOptions(id));
  },

  useEditUserMutation: (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, userEditData }: UserEditParams) => {
        const response = await userApi.put(id, userEditData);
        return response;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: userQueries.getQueryKey(id) });
        queryClient.invalidateQueries({ queryKey: key.users(id) });
      },
    });
  },

  usePostUserMutation: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: userData => userApi.post(userData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: key.users(0) });
      },
    });
  },

  useDeleteUserMutation: (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => userApi.delete(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: key.users(id) });
      },
    });
  },
};

export const nicknameQueries = {
  getQueryKey: key.nickname,
  useCheckNickname: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: data => userApi.checkNickname(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: nicknameQueries.getQueryKey() });
        queryClient.invalidateQueries({ queryKey: key.nickname() });
      },
    });
  },
};
