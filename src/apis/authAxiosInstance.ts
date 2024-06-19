import axios from 'axios';
import { API_BASE_URL } from '@/constants';

const authAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxODc3MTg2NCwiZXhwIjoxNzE4Nzc5MDY0fQ.O3jjrjAWrg3YifP2-Ghs0YgI6h4oxkvNaMKh1i34bwU',
  },
});

export default authAxiosInstance;
