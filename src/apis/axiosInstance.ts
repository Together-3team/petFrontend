import axios from 'axios';
import { API_BASE_URL } from '@/constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxODA3MTUxNywiZXhwIjoxNzE4MDc4NzE3fQ.Dkellb21YvGjN9-SstsVDFz-bANaUxJFP4WfOsW5kEo',
  },
});

export default axiosInstance;
