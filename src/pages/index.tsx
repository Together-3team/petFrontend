import MainLayout from '@/components/common/Layout/Main';
import styles from './Home.module.scss';

export default function HomePage() {
  return (
    <>
      <h1 className={styles.home}>HomePage</h1>
    </>
  );
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
