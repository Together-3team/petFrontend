import axios from 'axios';
import { API_BASE_URL } from '@/constants';

const authAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxODYzOTk4OCwiZXhwIjoxNzE4NjQ3MTg4fQ.tc10CpG_BdXXfmLsVxOGQUh5GZ5CwW2jWPjMfjwA6Zc',
  },
});

export default authAxiosInstance;
