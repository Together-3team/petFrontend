import { dehydrate } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './SearchPage.module.scss';
import Header from '@/components/common/Layout/Header';
import NavBottom from '@/components/common/Nav/Bottom';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import CardSliderRecommended from '@/components/common/Card/CardSlider/Recommended';
import { productsRecommendedQueries } from '@/apis/product/queries';
import { queryClient } from '@/utils/queryClient';
import SearchInput from '@/components/common/Input/SearchInput';
import { SearchFormValues, searchSchema } from '@/utils/searchSchema';
import { Keyword } from '@/types/components/search.types';
import SearchKeywords from '@/components/search/SearchKeywords';

export async function getServerSideProps() {
  await productsRecommendedQueries.prefetchQuery({ page: 1, pageSize: 8 });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function SearchPage() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(searchSchema),
  });
  const router = useRouter();

  const handleSearch = (data: SearchFormValues) => {
    const { search } = data;

    if (!search) {
      router.replace({
        pathname: '/search/result',
      });
      return;
    }

    const newKeyword = {
      id: Date.now(),
      text: search,
    };

    setKeywords(prev => {
      const oldIndex = prev.findIndex(_keyword => _keyword.text === search);
      const newKeywords = oldIndex >= 0 ? [...prev.slice(0, oldIndex), ...prev.slice(oldIndex + 1)] : prev;
      if (prev.length > 50) {
        prev.pop();
      }
      return [newKeyword, ...newKeywords];
    });

    router.push({
      pathname: '/search/result',
      query: {
        keyword: search,
      },
    });
  };

  const handleRemoveKeyword = (id: number) => {
    const nextKeyword = keywords.filter(keyword => keyword.id !== id);
    setKeywords(nextKeyword);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('keywords') || '[]';
      setKeywords(JSON.parse(result));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
  }, [keywords]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={styles.layout}>
      <Header.Root className={styles.header}>
        <form onSubmit={handleSubmit(handleSearch)} className={styles.searchBox}>
          <SearchInput autoFocus {...register('search')} placeholder="우리집 할미견 치아건강 책임질 효소치약" />
        </form>
      </Header.Root>
      {keywords.length > 0 && (
        <>
          <div className={styles.keywordsBox}>
            <SearchKeywords keywords={keywords} onRemove={handleRemoveKeyword} />
          </div>
          <div className={styles.divider} />
        </>
      )}
      {isMounted && (
        <div className={styles.recommendedBox}>
          <CardSliderRecommended title="이런 상품 찾고 있나요?" />
        </div>
      )}
      <FloatingBox>
        <NavBottom />
      </FloatingBox>
    </div>
  );
}
