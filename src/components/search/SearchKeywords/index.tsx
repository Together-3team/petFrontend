import styles from './SearchKeywords.module.scss';
import { Keyword } from '@/types/components/search.types';
import CancelIcon from '@/assets/svgs/ic-x.svg';
import Link from 'next/link';

interface SearchKeywordsProps {
  keywords: Keyword[];
  onRemove: (id: number) => void;
}

export default function SearchKeywords({ keywords = [], onRemove }: SearchKeywordsProps) {
  const maxLength = keywords.length > 10 ? 10 : keywords.length;

  return (
    <ul className={styles.list}>
      {keywords.slice(0, maxLength).map(keyword => (
        <li key={keyword.id} className={styles.item}>
          <Link
            href={{
              pathname: '/search/result',
              query: {
                keyword: keyword.text,
              },
            }}
            className={styles.link}>
            {keyword.text}
          </Link>
          <button type="button" className={styles.cancelButton} onClick={() => onRemove(keyword.id)}>
            <CancelIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}
