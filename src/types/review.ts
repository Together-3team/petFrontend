export interface Review {
  id: number;
  rating: number;
  reviewImages: string;
  description: string;
  combinationName: string;
  title: string;
  createdAt: any;
  quantity: string;
  thumbNailImage: string;
}

export interface PurchaseInfo {
  title: string;
  combinationName: string;
  quantity: number;
  thumbNailImage: string;
}
