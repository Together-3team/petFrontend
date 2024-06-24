import { QueryClient } from '@tanstack/react-query';
import { CartData } from '@/types/apis/product';
import { queryClient } from '@/utils/queryClient';

const CART_DATA_KEY = ['cartData'] as const;

export function setCartData(queryClient: QueryClient, cartData: CartData[]) {
  queryClient.setQueryData(CART_DATA_KEY, cartData);
}

export function getCartData(queryClient: QueryClient): CartData[] {
  return queryClient.getQueryData(CART_DATA_KEY) || [];
}
