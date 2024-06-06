import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import styles from './NavBottom.module.scss';
import getDynamicPath from '@/utils/getDynamicPath';
import HomeIcon from '@/assets/svgs/home.svg';
import SearchIcon from '@/assets/svgs/search-detail.svg';
import HeartIcon from '@/assets/svgs/heart.svg';
import PersonIcon from '@/assets/svgs/person.svg';

const cx = classNames.bind(styles);

const MENUS = [
  {
    id: 'home',
    title: '홈 페이지',
    url: '/',
    matchedUrl: [
      '/',
      '/test/products/1',
      '/test/products/2',
      '/test/products/3',
      '/test/products/4',
      '/test/products/5',
      '/test/products/6',
      '/test/events',
    ],
    Icon: <HomeIcon />,
  },
  {
    id: 'search',
    title: '검색 페이지',
    url: '/search',
    matchedUrl: ['/search'],
    Icon: <SearchIcon />,
  },
  {
    id: 'liked',
    title: '찜 페이지',
    url: '/liked',
    matchedUrl: ['/liked'],
    Icon: <HeartIcon className={cx('fill')} />,
  },
  {
    id: 'my',
    title: '마이 페이지',
    url: '/my',
    matchedUrl: ['/my'],
    Icon: <PersonIcon className={cx('fill')} />,
  },
];

export default function NavBottom() {
  const router = useRouter();
  const { pathname, query } = router;

  const dynamicPath = getDynamicPath(pathname, query);
  const matchedMenuData = MENUS.map(menu => ({ ...menu, isActive: menu.matchedUrl.some(url => dynamicPath === url) }));

  return (
    <nav className={cx('nav')}>
      <ul className={cx('container')}>
        {matchedMenuData.map(menu => (
          <li key={menu.id} className={cx('item', { active: menu.isActive })}>
            <Link href={menu.url} className={cx('link')}>
              {menu.Icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
