import classNames from 'classnames/bind';

import MainLayout from '@/components/common/Layout/Main';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

export default function HomePage() {
  return (
    <>
      <h1 className={cx('home')}>HomePage</h1>
      <div className={cx('test')}></div>
    </>
  );
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
