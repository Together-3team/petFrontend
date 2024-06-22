import { ProductsQueryDto } from '@/types/apis/product.types';
import { httpClient } from '../httpClient';

export async function getProducts(query: ProductsQueryDto) {
  const products = await httpClient().get('/products');
  return products;
}

export async function getProductsRecommended() {
  const products = await httpClient().get('/products/recommended');
  return products;
}

export async function getProductsHot() {
  const products = await httpClient().get('/products/hot');
  return products;
}
