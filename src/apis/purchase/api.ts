import axiosInstance from '@/apis/axiosInstance';

export interface PostPurchaseParams {
  deliveryId: number;
  selectedProductIds: number[];
  orderId: string;
  paymentKey: string;
  deliveryMessage: string;
}

export interface PurchaseRdo {
  id: number;
  deliveryName: string;
  recipient: string;
  recipientPhoneNumber: string;
  zipCode: number;
  address: string;
  detailedAddress: string;
  deliveryMessage: string;
  purchaseProducts: [PutProductRdo];
  orderId: string;
  paymentKey: string;
  paymentStatus: number;
}

export interface PutProductsParams {
  status: number;
  deliveryCompany: string;
  trackingNumber: string;
}

export interface PutProductRdo {
  id: number;
  title: string;
  status: number;
  combinationName: string;
  quantity: number;
  originalPrice: number;
  price: number;
  combinationPrice: number;
  thumbNailImage: string;
  deliveryCompany: string;
  trackingNumber: string;
  productId: number;
}

const purchaseApi = {
  getPurchase: () => {
    return axiosInstance.get(`/purchases`);
  },
  getDetailPurchase: (id: number) => {
    return axiosInstance.get(`/purchases/${id}`);
  },
  post: (body: PostPurchaseParams) => {
    return axiosInstance.post<PurchaseRdo>(`/purchases`, body);
  },
  putPaymentStatus: (id: number, body: number) => {
    return axiosInstance.put<PurchaseRdo>(`/purchases/${id}`, body);
  },
  putProducts: (id: number, body: PutProductsParams) => {
    return axiosInstance.put<PutProductRdo>(`/purchases/products/${id}`, body);
  },
};

export default purchaseApi;
