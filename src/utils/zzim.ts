import axios from '@/apis/axiosInstance';

export const getLikeStatus = async (productId: number, userId: number) => {
  const response = await axios.get(`/products/${productId}/likes/${userId}`);
  if (response.status === 200) {
    return true;
  } else if (response.status === 404) {
    return false;
  } else {
    throw new Error('상품 찜 상태를 가져오는데 실패했습니다.');
  }
};

export const likePost = async (productId: number, userId: number) => {
  const response = await axios.post(`/products/${productId}/likes/${userId}`);

  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error('상품 찜하기에 실패했습니다.');
  }
};

export const unlikePost = async (productId: number, userId: number) => {
  const response = await axios.delete(`/products/${productId}/likes/${userId}`);

  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error('상품 찜 해제하기에 실패했습니다.');
  }
};
