import axiosInstance from './axiosInstance';

//인증 관련 API 요청

const authAPI = {
  getGoogleAuth: () => {
    return axiosInstance.get(`/auth/google`).then(response => response.data);
  },
  getKakaoAuth: () => {
    return axiosInstance.get(`/auth/kakao`).then(response => response.data);
  },
  postRegisterData: <T>(body: T) => {
    return axiosInstance.post(`/register`, body);
  },
  postToken: <T>(body: T) => {
    return axiosInstance.post(`/auth/refresh`, body);
  },
};

export default authAPI;
