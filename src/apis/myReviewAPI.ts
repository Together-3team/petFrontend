import { httpClient } from '@/apis/httpClient';
import axiosInstance from './axiosInstance';
import { ReviewData } from '@/types/review';

// 리뷰 작성
export async function postReview(data: ReviewData) {
  try {
    const response = await httpClient().post('review/new', data);
    return response;
  } catch (error) {
    throw error;
  }
}

// 상세보기 리뷰 보여주기
export async function getReviewDetail(rid: any) {
  try {
    const response = await httpClient().get(`review/detail/${rid}`);
    return response;
  } catch (error) {
    throw error;
  }
}

// 리뷰 가능한 상품 목록 조회
export async function getReviewableData() {
  return axiosInstance.get(`/review/reviewable`);
}

// 작성한 리뷰 목록 조회
export async function getWroteReviewList() {
  return axiosInstance.get(`/review/wrote-reviews`);
}
