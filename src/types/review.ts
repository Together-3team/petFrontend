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

export interface ReviewData {
  productId: number;
  purchaseProductId: number;
  rating: number;
  description: string;
  reviewImages: string;
}

export interface WroteReview {
  id: number;
  rating: number;
  reviewImages: string;
  description: string;
  createdAt: string;
  isDeleted: number;
}

export interface WroteReviews {
  id: string;
  title: string;
  combinationName: string;
  quantity: number;
  price: number;
  originalPrice: number;
  thumbNailImage: string;
  combinationPrice: number;
  deliveryCompany: string;
  status: number;
  trackingNumber: string;
  review: WroteReview;
}
