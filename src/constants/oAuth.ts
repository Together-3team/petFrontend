export const CLIENT_ID = import.meta.env.REST_API_KEY;
export const REDIRECT_URL = import.meta.env.REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&prompt=login`;
