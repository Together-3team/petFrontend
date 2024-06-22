import * as Yup from 'yup';

export const searchSchema = Yup.object({
  search: Yup.string().trim().required(),
});

export type SearchFormValues = Yup.InferType<typeof searchSchema>;
