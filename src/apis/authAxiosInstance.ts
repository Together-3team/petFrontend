import axios from 'axios';
import { API_BASE_URL } from '@/constants';

const authAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxODcxMDAxMywiZXhwIjoxNzE4NzE3MjEzfQ.4kxGxyk0zBf9Fcto35aMD3waEI3ew7rYJsLokgW3inc',
  },
});

export default authAxiosInstance;
