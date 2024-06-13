import axios from 'axios';
import { API_BASE_URL } from '@/constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxODI2Njg4OCwiZXhwIjoxNzE4Mjc0MDg4fQ.HLb_N0JTZ8xXZVcEIwUUUrJ7xguUl0ZL4YPtSBtWCFE',
  },
});

export default axiosInstance;
