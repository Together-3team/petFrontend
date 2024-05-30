import { useEffect, useRef } from 'react';

/*
path에 따라 특정 요소에 포커스(scrollIntoView)하고 싶을 때 사용하는 훅입니다.

options는 안 넣어도 됩니다.
안 넣으면 scrollIntoView의 기본값이 들어갑니다.

사용)
export default function Example() {
  const router = useRouter();
  const { pathname, query } = router;
  const dynamicPath = getDynamicPath(pathname, query);

  const { ref: focusRef } = useScrollIntoViewWithPath(dynamicPath, {
    behavior: 'smooth',
    inline: 'center',
  });

  const menus = [
    { id: 1, title: '요소1', url: '/example1' },
    { id: 2, title: '요소2', url: '/example2' },
    { id: 3, title: '요소3', url: '/example3' }
  ];

  const matchedMenus = menus.map(menu => ({ ...menu, isActive: dynamicPath === menu.url }))

  return (
    <ul>
      {matchedMenus.map(menu => (
        <li key={menu.id} ref={el => {
          if (menu.isActive) {
            focusRef.current = el;
          }
        }}>
          {menu.title}
        </li>
      ))}
    </ul>
  )
}

*/
export default function useScrollIntoViewWithPath<T extends HTMLElement>(
  path: string,
  options?: ScrollIntoViewOptions
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const scrollIntoViewOptions = {
      ...options,
    };

    ref.current.scrollIntoView(scrollIntoViewOptions);
  }, [path, options]);

  return { ref };
}
