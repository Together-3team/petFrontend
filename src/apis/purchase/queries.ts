import { queryOptions, useQueryClient, useMutation } from '@tanstack/react-query';
import purchaseApi, { PutProductsRdo } from './api';
import { queryClient } from '@/utils/queryClient';

const key = {
  purchase: () => ['purchase'],
  purchaseDetail: () => ['purchaseDetail'],
};

export const purchaseQueries = {
  getQueryKey: key.purchase,
  removeQuery: () => queryClient.removeQueries({ queryKey: purchaseQueries.getQueryKey() }),
  queryOptions: () => {
    return queryOptions({
      queryKey: purchaseQueries.getQueryKey(),
      queryFn: () => purchaseApi.getPurchase(),
    });
  },

  usePutPurchaseMutation: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, body }: { id: number; body: PutProductsRdo }) => {
        const response = await purchaseApi.putPurchase(id, body);
        return response;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: purchaseQueries.getQueryKey() });
      },
    });
  },
};

export const purchaseDetailQueries = {
  getQueryKey: key.purchaseDetail,
  removeQuery: () => queryClient.removeQueries({ queryKey: purchaseDetailQueries.getQueryKey() }),
  queryOptions: (id: number) => {
    return queryOptions({
      queryKey: [purchaseDetailQueries.getQueryKey(), id],
      queryFn: async () => {
        const response = purchaseApi.getDetailPurchase(id);
        return response;
      },
    });
  },
};
