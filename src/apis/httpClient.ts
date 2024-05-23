import axiosInstance from './axiosInstance';

export function httpClient() {
  async function get<R>(url: string, options?: { params?: any; headers?: any }) {
    try {
      const response = await axiosInstance.get<R>(url, options);
      return response.data;
    } catch (error) {
      // location.href = '../pages/NotFoundPage';
      throw error;
    }
  }

  async function post<T, P>(url: string, data: P) {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
  }

  async function put<T, P>(url: string, data: P, options?: { headers?: any }) {
    const response = await axiosInstance.put<T>(url, data, options);
    return response.data;
  }

  async function del<T>(url: string) {
    const response = await axiosInstance.delete<T>(url);
    return response.data;
  }

  return {
    get,
    post,
    put,
    delete: del,
  };
}
