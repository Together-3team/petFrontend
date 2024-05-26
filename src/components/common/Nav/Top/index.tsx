import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import styles from './NavTop.module.scss';
import useDragScroll from '@/hooks/useDragScroll';
import menusData from '@/data/topMenus.json';
import getDynamicPath from '@/utils/getDynamicPath';
import useScrollIntoViewWithPath from '@/hooks/useScrollIntoViewWithPath';

const cx = classNames.bind(styles);

export default function NavTop() {
  const router = useRouter();
  const { pathname, query } = router;

  const dynamicPath = getDynamicPath(pathname, query);
  const dragScrollProps = useDragScroll<HTMLDivElement>();
  const { ref: linkRef } = useScrollIntoViewWithPath(dynamicPath, {
    behavior: 'smooth',
    inline: 'center',
  });
  const matchedMenuData = menusData.map(menu => ({ ...menu, isActive: dynamicPath === menu.url }));

  return (
    <nav className={cx('container')} {...dragScrollProps}>
      <ul className={cx('nav')}>
        {matchedMenuData.map(menu => (
          <li key={menu.id} className={cx('item', { active: menu.isActive })}>
            <Link
              href={menu.url}
              className={cx('link')}
              ref={el => {
                if (menu.isActive) {
                  linkRef.current = el;
                }
              }}>
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
