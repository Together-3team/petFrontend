import { RefObject } from 'react';

/*
가로 스크롤이 있을 때 Y축 스크롤은 유지하면서 특정 요소에 포커스(scrollTo)하고 싶을 때 사용하는 함수입니다.

함수이기 때문에 useEffect 안에 넣으셔도 되고 handler 함수 안에 넣으셔도 됩니다.

사용⭐️)
const menus = [
  { id: 1, title: '요소1', url: '/example1', isActive: false },
  { id: 2, title: '요소2', url: '/example2', isActive: true },
  { id: 3, title: '요소3', url: '/example3', isActive: false }
];

export default function Example() {
  const dragScrollProps = useDragScroll<HTMLDivElement>();
  const targetRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = () => {
    scrollToTargetX(dragScrollProps.ref, targetRef);
  }

  return (
    <ul {...dragScrollProps}>
      {matchedMenus.map(menu => (
        <li key={menu.id} ref={el => {
          if (menu.isActive) {
            targetRef.current = el;
          }
        }}
        onClick={handleMenuClick}>
          {menu.title}
        </li>
      ))}
    </ul>
  )
}
*/
export default function scrollToTargetX<T extends HTMLElement, U extends HTMLElement>(
  containerRef: RefObject<T>,
  targetRef: RefObject<U>
) {
  if (!containerRef.current || !targetRef.current) {
    return;
  }

  const targetLeft = targetRef.current.offsetLeft;
  const targetWidth = targetRef.current.offsetWidth;
  const containerWidth = containerRef.current.offsetWidth;
  const scrollLeft = targetLeft - (containerWidth - targetWidth) / 2;

  containerRef.current.scrollTo({
    behavior: 'smooth',
    left: scrollLeft,
  });
}
