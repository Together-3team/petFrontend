export interface Option {
  id: number;
  optionValue: string;
}

export interface OptionCombination {
  id: number;
  optionCombination: string;
  combinationPrice: number;
  combinationName: string;
  amount: number;
}

export interface Product {
  productImages: string;
  descriptionImages: string;
  thumbNailImage: string;
  title: string;
  originalPrice: number;
  price: number;
  reviewRating: number;
  reviewCount: number;
  productId: number;
  category: number;
  options: {
    '선택 1'?: Option[];
    '선택 2'?: Option[];
  };
  optionCombinations: OptionCombination[];
}
