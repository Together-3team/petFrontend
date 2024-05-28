export const CLIENT_ID = process.env.NEXT_PUBLIC_REST_API_KEY;
export const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&prompt=login`;
