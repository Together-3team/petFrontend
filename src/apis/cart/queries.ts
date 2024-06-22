import { queryOptions } from '@tanstack/react-query';

import { fetchCartProducts } from '@/apis/cartApi';
import { queryClient } from '@/utils/queryClient';

export const keys = {
  cart: () => ['cart'],
};

export const cartQueries = {
  queryKey: () => keys.cart(),
  queryOptions: () => {
    return queryOptions({
      queryKey: cartQueries.queryKey(),
      queryFn: () => fetchCartProducts(),
    });
  },
  prefetchQuery: () => {
    queryClient.prefetchQuery(cartQueries.queryOptions());
  },
  removeQueries: () => {
    queryClient.removeQueries({ queryKey: cartQueries.queryKey() });
  },
  invalidateQueries: () => {
    queryClient.invalidateQueries({ queryKey: cartQueries.queryKey() });
  },
};
