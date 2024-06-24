import styles from './SearchKeywords.module.scss';
import { Keyword } from '@/types/components/search.types';
import CancelIcon from '@/assets/svgs/ic-x.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface SearchKeywordsProps {
  keywords: Keyword[];
  onRemove: (id: number) => void;
}

export default function SearchKeywords({ keywords = [], onRemove }: SearchKeywordsProps) {
  const maxLength = keywords.length > 10 ? 10 : keywords.length;
  const router = useRouter();

  const handleSearch = (keyword: Keyword) => {
    const newKeyword = { ...keyword };
    const storedKeywordsJSON = localStorage.getItem('keywords') || '[]';
    const storedKeywords: Keyword[] = JSON.parse(storedKeywordsJSON);

    const oldKeywordIndex = storedKeywords.findIndex(storedKeyword => storedKeyword.text === newKeyword.text);

    if (oldKeywordIndex > -1) {
      storedKeywords.splice(oldKeywordIndex, 1);
    }

    const newKeywords = [newKeyword, ...storedKeywords];

    localStorage.setItem('keywords', JSON.stringify(newKeywords));

    router.replace({
      pathname: '/search/result',
      query: {
        keyword: newKeyword.text,
      },
    });
  };

  return (
    <ul className={styles.list}>
      {keywords.slice(0, maxLength).map((keyword, index) => (
        <>
          <li key={keyword.id} className={styles.item}>
            <button type="button" className={styles.keyword} onClick={() => handleSearch(keyword)}>
              {keyword.text}
            </button>
            <button type="button" className={styles.cancelButton} onClick={() => onRemove(keyword.id)}>
              <CancelIcon />
            </button>
          </li>
          {index < maxLength - 1 && <div className={styles.divider} />}
        </>
      ))}
    </ul>
  );
}
