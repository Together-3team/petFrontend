import { ParsedUrlQuery } from 'querystring';

/*
next/router의 useRouter로 pathname을 가져오면 동적 세그먼트의 경우에는 들어온 경로가 아닌 세그먼트로 값이 들어감.

이유)
라우터 경로가 /products/[productId]일 경우에
/products/123 으로 접속해서 useRouter의 pathname을 가져오면 /products/[productId]로 값이 반환됨.
이때 useRouter의 query값을 활용해서 [productId]에 매핑 시켜주는 함수.
그럼 원하는 /products/123을 뽑아올 수 있습니다.

사용)
export default function Example() {
  const router = useRouter();
  const { pathname, query } = router;
  const dynamicPath = getDynamicPath(pathname, query);
}

*/

export default function getDynamicPath(pathname: string, query: ParsedUrlQuery) {
  const dynamicPath = Object.keys(query).reduce((acc, key) => {
    const value = query[key];

    if (typeof value === 'string') {
      return acc.replace(`[${key}]`, value);
    }

    if (Array.isArray(value)) {
      return acc.replace(`[${key}]`, value[0]);
    }

    return acc;
  }, pathname);

  return dynamicPath;
}
