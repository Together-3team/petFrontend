import axios from 'axios';
import { API_BASE_URL } from '@/constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxODI1NTU5MSwiZXhwIjoxNzE4MjYyNzkxfQ.t8R-NzNTsoNUnUkTHy6mFoYjjmHC9OjdDhKof_WUzcE',
  },
});

export default axiosInstance;
