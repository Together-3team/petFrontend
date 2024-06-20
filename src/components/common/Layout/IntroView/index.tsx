import styles from './IntroView.module.scss';
import LogoFull from '@/components/common/Icon/LogoFull';
import ShareButton from '../../Button/Share';

export default function IntroView() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <LogoFull />
      </header>
      <div className={styles.title}>
        <p className={styles.titleMain}>반려동물 용품, 공구로 더 저렴하게!</p>
        <p className={styles.titleSub}>링크 공유하고 친구와 함께 할인받으세요</p>
      </div>
      <footer className={styles.footer}>
        <ShareButton />
      </footer>
    </div>
  );
}
