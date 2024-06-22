import { InferType, number, object, string } from 'yup';

const PageQueryDtoSchema = object({
  page: number().min(0),
  pageSize: number().min(1),
});

const FilterQuerySchema = object({
  petType: string().optional(),
  productType: string().optional(),
  orderBy: string().optional(),
});

const ProductsQueryDtoSchema = PageQueryDtoSchema.concat(FilterQuerySchema);

export type PageQueryDto = InferType<typeof PageQueryDtoSchema>;
export type FilterQuery = InferType<typeof FilterQuerySchema>;
export type ProductsQueryDto = InferType<typeof ProductsQueryDtoSchema>;
