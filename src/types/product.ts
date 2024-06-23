export interface Option {
  id: number;
  optionValue: string;
  optionPrice: number;
}

export interface OptionCombination {
  id: number;
  optionCombination: string;
  combinationPrice: number;
  combinationName: string;
  amount: number;
}

export interface ProductDetail {
  description: string;
  id: number;
  productImages: string;
  descriptionImages: string;
}

export interface ProductReview {
  id: number;
  rating: number;
  reviewImages: string;
  description: string;
  createdAt: string;
  reviewerName: string;
  reviewerProfileImage: string;
  optionCombination: string;
}

export interface Product {
  id: number;
  petType: number;
  productType: number;
  thumbNailImage: string;
  title: string;
  originalPrice: number;
  price: number;
  averageRating: number;
  reviewCount: number;
  totalAmount: number;
  isZzimed: boolean;
  options: {
    [key: string]: Option[];
  };
  optionCombinations: OptionCombination[];
  detail: ProductDetail;
  reviews: ProductReview[];
}
