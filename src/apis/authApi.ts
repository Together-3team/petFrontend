import axiosInstance from './axiosInstance';

//인증 관련 API 요청

export interface GoogleAuthResponse {
  registered: boolean;
  email: string;
  profileToken: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface KakaoAuthResponse {
  registered: boolean;
  email: string;
  profileToken: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface RegisterRdo {
  accessToken: string;
  refreshToken: string;
}

const authApi = {
  postRegisterData: <T>(body: T) => {
    return axiosInstance.post<RegisterRdo>(`/auth/register`, body);
  },

  postToken: <T>(body: T) => {
    return axiosInstance.post<RegisterRdo>(`/auth/refresh`, body);
  },
};

export default authApi;
