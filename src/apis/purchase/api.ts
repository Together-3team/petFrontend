import axiosInstance from '@/apis/axiosInstance';

export interface PostPurchaseParams {
  deliveryId: number;
  selectedProductIds: number[];
  orderId: string;
  paymentKey: string;
  deliveryMessage: string;
}

export interface PurchaseRdo {
  paymentStatus: number;
}

export interface PutProductsRdo {
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
  putPaymentStatus: (id: number, body: PurchaseRdo) => {
    return axiosInstance.put<PurchaseRdo>(`/purchases/${id}`, body);
  },
  putPurchase: (id: number, body: PutProductsRdo) => {
    return axiosInstance.put<PutProductsRdo>(`/purchases/products/${id}`, body);
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/purchases/${id}`);
    return response;
  },
};

export default purchaseApi;
