import { userApi } from '@/apis/user/api';

export default async function checkNickname(
  nickname: string,
  setError?: (name: string, error: object) => void,
  clearError?: (name?: string | string[]) => void
) {
  if (nickname) {
    try {
      const response = await userApi.checkNickname({ nickname });
      if (response.data.duplicated) {
        setError && setError('nickname', { type: 'manual', message: '이미 존재하는 닉네임입니다.' });
      } else {
        clearError && clearError('nickname');
      }
    } catch (error) {
      console.error('닉네임 중복 검사 오류:', error);
    }
  }
}
