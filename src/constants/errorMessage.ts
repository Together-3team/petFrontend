export const SERVER_ERROR_MESSAGE = {
  USER: {
    NOT_FOUND: '존재하지 않는 유저입니다.',
    UNAUTHORIZED: '로그인이 필요합니다.',
  },
} as const;

export const FETCH_ERROR_MESSAGE = {
  REQUEST: '요청에 실패했습니다.',
  UNKNOWN: '잠시 후 다시 시도해 주세요.',
} as const;

export const ERROR_MESSAGE = {
  ISDEFAULT: '기본 배송지는 삭제할 수 없습니다.',
};
