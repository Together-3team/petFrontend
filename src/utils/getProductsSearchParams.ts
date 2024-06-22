import { ProductsQueryDto } from '@/types/apis/product.types';

const PAGE_SIZE = 8;

export default function getProductsSearchParams(params: ProductsQueryDto) {
  const searchParams = new URLSearchParams();
  const { page, pageSize, petType, productType, orderBy } = params;

  searchParams.set('page', (page || 1).toString());
  searchParams.set('pageSize', (pageSize || PAGE_SIZE).toString());

  if (petType) {
    searchParams.set('petType', petType);
  }

  if (productType) {
    searchParams.set('productType', productType);
  }

  if (orderBy) {
    searchParams.set('orderBy', orderBy);
  }

  return searchParams;
}
