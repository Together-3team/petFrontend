import axios from 'axios';
import { API_BASE_URL } from '@/constants';

const authAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxODcyOTM1NSwiZXhwIjoxNzE4NzM2NTU1fQ.dRunCp8W0t0xAyE6JZqvdfPmedoKC1h-hKi0U_cMsH0',
  },
});

export default authAxiosInstance;
