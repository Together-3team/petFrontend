import axiosInstance from '@/apis/axiosInstance';

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
  return response.data;
}

export interface UserId {
  id: number;
}

export interface UserEditProps {
  nickname?: string;
  phoneNumber: string;
  profileImage?: string;
  isSubscribedToPromotions: boolean;
  preferredPet: number;
}

export interface UserEditParams {
  data?: UserEditProps;
  userEditData?: UserEditProps;
  id: number;
}

export type UserEditRdo = Required<UserEditParams>;

export interface DeleteUserRdo {
  raw: object[];
  affected: number;
}

export const userApi = {
  getUserData: (id: number) => {
    return axiosInstance.get(`/users/${id}`);
  },
  put: async <T>(id: number, body: T) => {
    const response = axiosInstance.put<UserEditRdo>(`/users/${id}`, body);
    return response;
  },
  post: <T>(body: T) => {
    return axiosInstance.post(`/users`, body);
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete<DeleteUserRdo>(`/users/${id}`);
    return response;
  },
  checkNickname: <T>(body: T) => {
    return axiosInstance.post(`/users/verify-nickname`, body);
  },
};
