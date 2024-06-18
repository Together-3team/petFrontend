import { httpClient } from '@/apis/httpClient';

// 리뷰 작성
export async function postReview(data: any) {
  try {
    const response = await httpClient().post('review/new', data);
    return response;
  } catch (error) {
    throw error;
  }
}

// 상세보기 리뷰 보여주기
export async function name(data: any) {}
