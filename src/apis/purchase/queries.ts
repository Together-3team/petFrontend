import { queryOptions, QueryClient } from '@tanstack/react-query';
import purchaseApi from './api';

const key = {
  purchase: () => ['purchase'],
  purchaseDetail: () => ['purchaseDetail'],
};

const queryClient = new QueryClient();

export const purchaseQueries = {
  getQueryKey: key.purchase,
  removeQuery: () => queryClient.removeQueries({ queryKey: purchaseQueries.getQueryKey() }),
  queryOptions: () => {
    return queryOptions({
      queryKey: purchaseQueries.getQueryKey(),
      queryFn: () => purchaseApi.getPurchase(),
    });
  },
};

export const purchaseDetailQueries = {
  getQueryKey: key.purchaseDetail,
  removeQuery: () => queryClient.removeQueries({ queryKey: purchaseQueries.getQueryKey() }),
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
