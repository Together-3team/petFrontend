import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { FilterQuery, ProductsQueryDto } from '@/types/apis/product.types';
import { getProducts, getProductsHot, getProductsRecommended, getProductsSearch, getZzims } from './api';
import { queryClient } from '@/utils/queryClient';

export const keys = {
  products: () => ['products'],
  productsByFilter: (params: ProductsQueryDto) => [...keys.products(), 'byFilter', params],
  productsInfinity: () => [...keys.products(), 'infinityQuery'],
  ProductsInfinityByFilter: (params: FilterQuery) => [...keys.productsInfinity(), 'byfilter', params],
  productsSearch: () => [...keys.products(), 'search'],
  productsSearchInfinity: (params: ProductsQueryDto) => [...keys.productsSearch(), 'infinityQuery', params],
  productsRecommended: () => [...keys.products(), 'recommended'],
  productsRecommendedByFilter: (params: ProductsQueryDto) => [...keys.productsRecommended(), 'byFilter', params],
  productsRecommendedInfinity: () => [...keys.productsRecommended(), 'infinityQuery'],
  productsRecommendedInfinityByFilter: (params: FilterQuery) => [
    ...keys.productsRecommendedInfinity(),
    'byFilter',
    params,
  ],
  productsHot: () => [...keys.products(), 'hot'],
  productsHotByFilter: (params: ProductsQueryDto) => [...keys.productsHot(), 'byFilter', params],
  productsHotInfinity: () => [...keys.productsHot(), 'infinityQuery'],
  productsHotInfinityByFilter: (params: FilterQuery) => [...keys.productsHotInfinity(), 'byFilter', params],
  zzims: () => ['zzims'],
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

export const infiniteProductsQueries = {
  queryKey: (params: FilterQuery) => keys.ProductsInfinityByFilter(params),
  queryOptions: (params: ProductsQueryDto) => {
    return infiniteQueryOptions({
      queryKey: infiniteProductsQueries.queryKey(params),
      queryFn: ({ pageParam }) => getProducts({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        const { page, pageSize, totalCount } = lastPage;
        const totalPage = Math.ceil(totalCount / pageSize);

        if (totalPage < 1) {
          return undefined;
        }

        return totalPage !== page ? lastPageParam + 1 : undefined;
      },
    });
  },
  prefetchQuery: (params: ProductsQueryDto) => {
    queryClient.prefetchQuery(infiniteProductsQueries.queryOptions(params));
  },
};

export const infiniteProductsSearchQueries = {
  queryKey: (params: FilterQuery) => keys.productsSearchInfinity(params),
  queryOptions: (params: ProductsQueryDto) => {
    return infiniteQueryOptions({
      queryKey: infiniteProductsSearchQueries.queryKey(params),
      queryFn: ({ pageParam }) => getProductsSearch({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        const { page, pageSize, totalCount } = lastPage;
        const totalPage = Math.ceil(totalCount / pageSize);

        if (totalPage < 1) {
          return undefined;
        }

        return totalPage !== page ? lastPageParam + 1 : undefined;
      },
    });
  },
  prefetchQuery: (params: ProductsQueryDto) => {
    queryClient.prefetchQuery(infiniteProductsSearchQueries.queryOptions(params));
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

export const infiniteProductsRecommendedQueries = {
  queryKey: (params: FilterQuery) => keys.productsRecommendedInfinityByFilter(params),
  queryOptions: (params: ProductsQueryDto) => {
    return infiniteQueryOptions({
      queryKey: infiniteProductsRecommendedQueries.queryKey(params),
      queryFn: ({ pageParam }) => getProductsRecommended({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        const { page, pageSize, totalCount } = lastPage;
        const totalPage = Math.ceil(totalCount / pageSize);

        if (totalPage < 1) {
          return undefined;
        }

        return totalPage !== page ? lastPageParam + 1 : undefined;
      },
    });
  },
  prefetchQuery: (params: ProductsQueryDto) => {
    queryClient.prefetchQuery(infiniteProductsRecommendedQueries.queryOptions(params));
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

export const infiniteProductsHotQueries = {
  queryKey: (params: FilterQuery) => keys.productsHotInfinityByFilter(params),
  queryOptions: (params: ProductsQueryDto) => {
    return infiniteQueryOptions({
      queryKey: infiniteProductsHotQueries.queryKey(params),
      queryFn: ({ pageParam }) => getProductsHot({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        const { page, pageSize, totalCount } = lastPage;
        const totalPage = Math.ceil(totalCount / pageSize);

        if (totalPage < 1) {
          return undefined;
        }

        return totalPage !== page ? lastPageParam + 1 : undefined;
      },
    });
  },
  prefetchQuery: (params: ProductsQueryDto) => {
    queryClient.prefetchQuery(infiniteProductsHotQueries.queryOptions(params));
  },
};

export const zzimsQueries = {
  queryKey: () => keys.zzims(),
  queryOptions: () => {
    return queryOptions({
      queryKey: zzimsQueries.queryKey(),
      queryFn: () => getZzims(),
    });
  },
  prefetchQuery: () => {
    queryClient.prefetchQuery(zzimsQueries.queryOptions());
  },
  removeQueries: () => {
    queryClient.removeQueries({ queryKey: zzimsQueries.queryKey() });
  },
  invalidateQueries: () => {
    queryClient.invalidateQueries({ queryKey: zzimsQueries.queryKey() });
  },
};
