export interface Product {
  id: number;
  productTitle: string;
  option: string;
  productCost: number;
  originalCost: number;
  combinationPrice: number;
  productNumber: number;
  imageUrl: string;
  selectedProductId: number | undefined;
  groupBuyingId?: number;
}

export interface CartData extends Product {
  isChecked: boolean;
}
