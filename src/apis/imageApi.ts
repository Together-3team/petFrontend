import axios from 'axios';
import axiosInstance from './axiosInstance';

export interface PutImageToUrlParams {
  image: File;
  url: string;
}

export interface PostToGetPresignedUrlParams {
  items: [{ objectKey: string; contentType: string }];
  bucketName: string;
}

export interface PostToGetPresignedUrlRdo {
  presignedUrl: [{ url: string; objectKey: string; uniqueFileName: string }];
}

// 이미지 업로드 presigned url 받기
export async function postToGetPresignedUrl(body: PostToGetPresignedUrlParams) {
  return axiosInstance.post<PostToGetPresignedUrlRdo>(`/utility/presigned-urls`, body);
}

// 받은 presigned url에 이미지 파일 업로드
export async function putImageToUrl({ image, url }: PutImageToUrlParams) {
  const headers = {
    'Content-Type': image.type,
    bucketName: `${process.env.NEXT_PUBLIC_BUCKET_NAME}`,
  };
  await axios.put(url, image, { headers });
}
