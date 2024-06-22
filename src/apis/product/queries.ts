import { ProductsQueryDto } from '@/types/apis/product.types';
import { queryOptions } from '@tanstack/react-query';
import { getProducts } from './api';

export const keys = {
  products: () => ['products'],
  productsByFilter: (query: ProductsQueryDto) => [...keys.products(), 'byFilter', query],
};

export const productsQueries = {
  queryKey: (query: ProductsQueryDto) => keys.productsByFilter(query),
  queryOptions: (query: ProductsQueryDto) => {
    return queryOptions({
      queryKey: productsQueries.queryKey(query),
      // queryFn: (params: ProductsQueryDto) => getProducts(params),
    });
  },
};

export const productsRecommendedQueries = {};

export const productsHotQueries = {};
