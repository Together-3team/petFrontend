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
  try {
    const response = await axiosInstance.get('/users/me');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
// httpClient 적용 실패...
// export async function fetchMyData(): Promise<UserResponse> {
//   try {
//     const response = await httpClient().get<{ data: UserResponse }>('/users/me');
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//     throw error;
//   }
// }
