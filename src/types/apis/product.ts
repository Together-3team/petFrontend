export interface Product {
  id: number;
  productTitle: string;
  option: string;
  optionCost: number;
  productCost: number;
  originalCost: number;
  combinationPrice: number;
  productNumber: number;
  imageUrl: string;
  groupBuyingId?: number;
}

export interface CartData extends Product {
  isChecked: boolean;
}
