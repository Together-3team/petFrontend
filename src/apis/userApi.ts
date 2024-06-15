import axiosInstance from './axiosInstance';

export interface UserResponse {
  id?: number;
  nickname: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  provider: string;
  isSubscribedToPromotions: boolean;
}

export async function fetchMyData() {
  const response = await axiosInstance.get(`/users/me`);
  console.log(response);
  return response.data;
}

interface UserData {
  id: string;
}

export const userApi = {
  getUserData: ({ id }: UserData) => {
    return axiosInstance.get(`/users/${id}`);
  },
  put: <T>({ id }: UserData, body: T) => {
    return axiosInstance.put(`/users/${id}`, body);
  },
  post: <T>(body: T) => {
    return axiosInstance.post(`/users`, body);
  },
  delete: ({ id }: UserData) => {
    return axiosInstance.delete(`/users/${id}`);
  },
  checkNickname: <T>(body: T) => {
    return axiosInstance.post(`/users/verify-nickname`, body);
  },
};
