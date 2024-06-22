import { queryOptions } from '@tanstack/react-query';

import { ProductsQueryDto } from '@/types/apis/product.types';
import { getProducts, getProductsHot, getProductsRecommended } from './api';
import { queryClient } from '@/utils/queryClient';

export const keys = {
  products: () => ['products'],
  productsByFilter: (params: ProductsQueryDto) => [...keys.products(), 'byFilter', params],
  productsRecommended: () => [...keys.products(), 'recommended'],
  productsRecommendedByFilter: (params: ProductsQueryDto) => [...keys.productsRecommended(), 'byFilter', params],
  productsHot: () => [...keys.products(), 'hot'],
  productsHotByFilter: (params: ProductsQueryDto) => [...keys.productsHot(), 'byFilter', params],
};

export const productsQueries = {
  queryKey: (params: ProductsQueryDto) => keys.productsByFilter(params),
  queryOptions: (params: ProductsQueryDto) => {
    return queryOptions({
      queryKey: productsQueries.queryKey(params),
      queryFn: () => getProducts(params),
    });
  },
  prefetchQuery: (params: ProductsQueryDto) => {
    queryClient.prefetchQuery(productsQueries.queryOptions(params));
  },
};

export const productsRecommendedQueries = {
  queryKey: (params: ProductsQueryDto) => keys.productsRecommendedByFilter(params),
  queryOptions: (params: ProductsQueryDto) => {
    return queryOptions({
      queryKey: productsRecommendedQueries.queryKey(params),
      queryFn: () => getProductsRecommended(params),
    });
  },
  prefetchQuery: (params: ProductsQueryDto) => {
    queryClient.prefetchQuery(productsRecommendedQueries.queryOptions(params));
  },
};

export const productsHotQueries = {
  queryKey: (params: ProductsQueryDto) => keys.productsHotByFilter(params),
  queryOptions: (params: ProductsQueryDto) => {
    return queryOptions({
      queryKey: productsHotQueries.queryKey(params),
      queryFn: () => getProductsHot(params),
    });
  },
  prefetchQuery: (params: ProductsQueryDto) => {
    queryClient.prefetchQuery(productsHotQueries.queryOptions(params));
  },
};
