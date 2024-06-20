import { ChangeEvent } from 'react';
import { userApi } from '@/apis/userApi';
import { useForm } from 'react-hook-form';

export default async function CheckNickname(e: ChangeEvent<HTMLInputElement>) {
  const methods = useForm();
  const { setError } = methods;

  const nickname = e.target.value;
  if (nickname) {
    try {
      const response = await userApi.checkNickname({ nickname });
      if (response.data.duplicated) {
        setError('nickname', { type: 'manual', message: '이미 존재하는 닉네임입니다.' });
      }
    } catch (error) {
      console.error('닉네임 중복 검사 오류:', error);
    }
  }
}
