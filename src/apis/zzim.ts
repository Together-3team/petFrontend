import axiosInstance from '@/apis/axiosInstance';

interface User {
  snsId: string;
  provider: string;
  isSubscribedToPromotions: boolean;
  email: string;
  nickname: string;
  phoneNumber: string;
  id: 11;
  profileImage: string;
  createdAt: Date;
}

interface Product {
  thumbNailImage: string;
  isDeleted: number;
  id: number;
  title: string;
  originalPrice: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Info {
  user: User;
  product: Product;
  id: number;
  createdAt: Date;
}

interface Zzim {
  zzim_id: number;
  zzim_createdAt: Date;
  zzim_userId: number;
  zzim_productId: number;
  product_id: number;
  product_title: string;
  product_originalPrice: number;
  product_price: number;
  product_thumbNailImage: string;
  product_isDeleted: number;
  product_petType: number;
  product_productType: number;
  product_createdAt: Date;
  product_updatedAt: Date;
  product_detailId: number;
  product_categoryId: null;
}

export const getLikeStatus = async (productId: number) => {
  const response = await axiosInstance.get(`/zzims`);
  if (response.status === 200) {
    const product = response.data.find((info: Info) => {
      return info.product.id === productId;
    });
    if (product) return true;
    return false;
  } else if (response.status === 404) {
    throw new Error('존재하지 않는 사용자입니다.');
  } else {
    throw new Error('상품 찜 상태를 가져오는데 실패했습니다.');
  }
};

export const likeProduct = async (productId: number) => {
  const response = await axiosInstance.post(`zzims`, { productId: productId });

  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error('상품 찜하기에 실패했습니다.');
  }
};

export const unlikeProduct = async (productId: number) => {
  // const response = await axiosInstance.get('/zzims');
  // const data = response.data;
  // const zzimedProduct = data.find((data: Zzim) => {
  //   return data.product_id === productId;
  // });

  const deleteResponse = await axiosInstance.delete(`/zzims/${productId}`);

  if (!(deleteResponse.status >= 200 && deleteResponse.status < 300)) {
    throw new Error('상품 찜 해제하기에 실패했습니다.');
  }
};
