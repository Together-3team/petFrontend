import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import axiosInstance from '@/apis/axiosInstance';
import { isAxiosError } from 'axios';

import useToast from './useToast';
import { FETCH_ERROR_MESSAGE, SERVER_ERROR_MESSAGE } from '@/constants/errorMessage';
import { deliveryFormSchema } from '@/utils/deliveryFormSchema';

export type FormValues = Yup.InferType<typeof deliveryFormSchema>;

interface UpdateAddressInfoParams {
  id: number;
  addressInfo: FormValues;
}

export function useUpdateAddressInfo(prevPath?: string | string[] | undefined) {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, addressInfo }: UpdateAddressInfoParams) => {
      const res = await axiosInstance.put(`/deliveries/${id}`, JSON.stringify(addressInfo));
      const data = res.data;
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
