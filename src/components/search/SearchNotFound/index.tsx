import styles from './SearchNotFound.module.scss';
import SearchNotFoundIcon from '@/assets/svgs/search-not-found.svg';

export default function SearchNotFound() {
  return (
    <div className={styles.container}>
      <SearchNotFoundIcon />
      <div className={styles.contents}>
        <p className={styles.title}>검색 결과가 없어요</p>
        <p className={styles.description}>다른 키워드로 검색해주세요.</p>
      </div>
    </div>
  );
}
