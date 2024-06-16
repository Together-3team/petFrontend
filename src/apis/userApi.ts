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

export interface UserId {
  id: number;
}

export interface UserEditProps {
  nickname: string;
  phoneNumber: string;
  profileImage: string;
  isSubscribedToPromotions: boolean;
  prefferedPet: string;
}

export interface UserEditParams {
  userData: UserEditProps;
  id: UserId;
}

export const userApi = {
  getUserData: ({ id }: UserId) => {
    return axiosInstance.get(`/users/${id}`);
  },
  put: <T>(id: UserId, body: T) => {
    return axiosInstance.put(`/users/${id}`, body);
  },
  post: <T>(body: T) => {
    return axiosInstance.post(`/users`, body);
  },
  delete: (id: UserId) => {
    return axiosInstance.delete(`/users/${id}`);
  },
  checkNickname: <T>(body: T) => {
    return axiosInstance.post(`/users/verify-nickname`, body);
  },
};
