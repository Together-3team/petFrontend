import { useMutation } from '@tanstack/react-query';
import axios from '@/apis/axiosInstance';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import useToast from './useToast';
import { DeliveryInfo } from '@/types/components/delivery';
import { FETCH_ERROR_MESSAGE, SERVER_ERROR_MESSAGE } from '@/constants/errorMessage';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTUsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MTg2OTIyMDAsImV4cCI6MTcxODY5OTQwMH0.0FbXlHrTeLloQAWOw4BDDQ5xln52l4UzSiI2WP4eskw';

interface UpdateAddressParams {
  selectedOption: DeliveryInfo;
  updatedOption: DeliveryInfo;
}

export function useUpdateAddress(prevPath?: string | string[] | undefined) {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async ({ selectedOption, updatedOption }: UpdateAddressParams) => {
      const res = await axios.put(`/deliveries/${selectedOption.id}`, JSON.stringify(updatedOption), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;
      console.log('Response:', data);
      return data;
    },
    onSuccess: () => {
      if (prevPath) {
        router.push(Array.isArray(prevPath) ? prevPath[0] : prevPath);
        return;
      }
      router.back();
    },

    onError: error => {
      if (!isAxiosError(error)) {
        // `AxiosError`가 아닌 경우
        showToast({
          status: 'error',
          message: FETCH_ERROR_MESSAGE.UNKNOWN,
        });
        return;
      }
      // `AxiosError`인 경우 에러 처리
      if (!error.response) {
        showToast({
          status: 'error',
          message: FETCH_ERROR_MESSAGE.REQUEST,
        });
        return;
      }
      const status = error.response?.status;
      switch (status) {
        case 400:
          showToast({
            status: 'error',
            message: SERVER_ERROR_MESSAGE.USER.NOT_FOUND,
          });
          return;
      }
    },
  });
}
