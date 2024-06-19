import axiosInstance from './axiosInstance';

interface PutImageToUrlParams {
  image: string;
  url: string;
}

interface PostToGetPresignedUrlParams {
  items: [objectKey: string, contentType: string];
  bucketName: string;
}

export interface PostToGetPresignedUrlRdo {
  presignedUrls: [{ url: string; objectKey: string }];
}

// 이미지 업로드 presigned url 받기
export async function postToGetPresignedUrl(body: PostToGetPresignedUrlParams) {
  return axiosInstance.post<PostToGetPresignedUrlRdo>(`/utility/presigned-urls`, {
    body,
  });
}

// 받은 presigned url에 이미지 파일 업로드
export async function putImageToUrl({ image, url }: PutImageToUrlParams) {
  const headers = {
    'Content-Type': image,
  };
  await axiosInstance.put(url, image, { headers });
}
