import axios from 'axios';
import { API_BASE_URL } from '@/constants';

const authAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxODY3Njc0NCwiZXhwIjoxNzE4NjgzOTQ0fQ.-70f8mQ64pWwx89lC3hRbM6gz1t7F4lwUMiPx3FVd1Q',
  },
});

export default authAxiosInstance;
