import axiosInstance from './axiosInstance';

interface PutImageToUrlProps {
  image: string;
  url: string;
}

// 이미지 업로드 presigned url 받기
export async function postToGetPresignedUrl<T>(body: T) {
  return axiosInstance.post(`/utility/presigned-urls`, {
    body,
  });
}

// 받은 presigned url에 이미지 파일 업로드
export async function putImageToUrl({ image, url }: PutImageToUrlProps) {
  const headers = {
    'Content-Type': image,
  };
  await axiosInstance.put(url, image, { headers });
}
