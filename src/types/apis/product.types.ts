import { InferType, array, number, object, string } from 'yup';

const PageQueryDtoSchema = object({
  page: number().min(1),
  pageSize: number().min(1),
});

const FilterQuerySchema = object({
  petType: string().optional(),
  productType: string().optional(),
  orderBy: string().optional(),
  keyword: string().optional(),
});

const ProductsQueryDtoSchema = PageQueryDtoSchema.concat(FilterQuerySchema);

export type PageQueryDto = InferType<typeof PageQueryDtoSchema>;
export type FilterQuery = InferType<typeof FilterQuerySchema>;
export type ProductsQueryDto = InferType<typeof ProductsQueryDtoSchema>;
export interface ProductRdo {
  id: number;
  originalPrice: number;
  price: number;
  title: string;
  thumbNailImage: string;
  petType: number;
  productType: number;
  averageRating: number;
  reviewCount: number;
  totalAmount: number;
  isZzimed: boolean;
}
export interface ProductsRdo {
  page: number;
  pageSize: number;
  totalCount: number;
  data: ProductRdo[];
}
