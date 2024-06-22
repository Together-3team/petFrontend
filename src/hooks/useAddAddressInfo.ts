import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import axiosInstance from '@/apis/axiosInstance';
import { isAxiosError } from 'axios';

import useToast from './useToast';
import { FETCH_ERROR_MESSAGE, SERVER_ERROR_MESSAGE } from '@/constants/errorMessage';
import { deliveryFormSchema } from '@/utils/deliveryFormSchema';

export type FormValues = Yup.InferType<typeof deliveryFormSchema>;

export function useAddAddressInfo(prevPath?: string | string[] | undefined) {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async ({ addressInfo }: { addressInfo: FormValues }) => {
      const res = await axiosInstance.post(`/deliveries`, JSON.stringify(addressInfo));
      const data = res.data;
      console.log('Response:', data);
      return data;
    },
    onSuccess: () => {
      if (prevPath) {
        router.push(Array.isArray(prevPath) ? prevPath[0] : prevPath);
        return;
      }
      if (window.history.length > 2) {
        router.back();
      } else {
        router.push('/my/delivery'); // 이전 페이지가 없는 경우 기본 경로로 이동
      }
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
