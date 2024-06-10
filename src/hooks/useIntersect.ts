import { useCallback, useEffect, useRef } from 'react';

type IntersectHandler = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

export default function useIntersect(onIntersect: IntersectHandler, options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    //cleanup 함수
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
}

{
  /* IntersectionObserver 커스텀 훅
ref: target 요소를 저장하기 위함
isIntersecting: root와 target이 교차 상태인지 확인하는 boolean
useEffect 콜백에서 IntersectionObserver 객체 생성
observe 호출로 target 요소 관찰을 시작한다.

사용예시
const ref = useIntersect(async (entry, observer) => {
  observer.unobserve(entry.target);
  if (nextPage){
  fetchData();
  }
})
if(!data) return;

return(
  {nextPage && <div ref={ref}>target</div>} 
)
*/
}
