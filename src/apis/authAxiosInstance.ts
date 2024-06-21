import axios from 'axios';

const authAxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_FRONT_API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authAxiosInstance;
