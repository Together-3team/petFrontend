import { ProductRdo, ProductsQueryDto, ProductsRdo } from '@/types/apis/product.types';
import { httpClient } from '@/apis/httpClient';
import getProductsSearchParams from '@/utils/getProductsSearchParams';

export async function getProducts(params: ProductsQueryDto) {
  const searchParams = getProductsSearchParams(params);

  const products = await httpClient().get<ProductsRdo>(`/products?${searchParams}`);
  return products;
}

export async function getProductsSearch(params: ProductsQueryDto) {
  const searchParams = getProductsSearchParams(params);

  const products = await httpClient().get<ProductsRdo>(`/products/search?${searchParams}`);
  return products;
}

export async function getProductsRecommended(params: ProductsQueryDto) {
  const searchParams = getProductsSearchParams(params);

  const products = await httpClient().get<ProductsRdo>(`/products/recommended?${searchParams}`);
  return products;
}

export async function getProductsHot(params: ProductsQueryDto) {
  const searchParams = getProductsSearchParams(params);

  const products = await httpClient().get<ProductsRdo>(`/products/hot?${searchParams}`);
  return products;
}

export async function getZzims() {
  const products = await httpClient().get<ProductRdo[]>(`/zzims`);
  return products;
}
