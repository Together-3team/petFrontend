import Link from 'next/link';

import styles from './Nav.module.scss';

const DUMMY_MENUS = [
  { id: 1, title: 'Home', url: '/' },
  { id: 2, title: '인기상품', url: '/test/products/2' },
  { id: 3, title: 'NEW신상', url: '/test/products/3' },
  { id: 4, title: '특가상품', url: '/test/products/4' },
  { id: 5, title: '샘플', url: '/test/products/5' },
  { id: 6, title: '비밀상점', url: '/test/products/6' },
  { id: 7, title: '최저가', url: '/test/products/7' },
  { id: 8, title: '이벤트', url: '/test/events' },
];

export default function Nav() {
  return (
    <nav className={styles.container}>
      <ul className={styles.nav}>
        {DUMMY_MENUS.map(menu => (
          <li key={menu.id} className={styles.item}>
            <Link href={menu.url} className={styles.link}>
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
