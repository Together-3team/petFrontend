import { dehydrate } from '@tanstack/react-query';

import styles from './SearchPage.module.scss';
import Header from '@/components/common/Layout/Header';
import NavBottom from '@/components/common/Nav/Bottom';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import CardSliderRecommended from '@/components/common/Card/CardSlider/Recommended';
import { productsRecommendedQueries } from '@/apis/product/queries';
import { queryClient } from '@/utils/queryClient';
import SearchInput from '@/components/common/Input/SearchInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchFormValues, searchSchema } from '@/utils/searchSchema';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export async function getServerSideProps() {
  await productsRecommendedQueries.prefetchQuery({ page: 1, pageSize: 8 });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

interface Keyword {
  id: number;
  text: string;
}

export default function SearchPage() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(searchSchema),
  });
  const router = useRouter();

  const handleSearch = (data: SearchFormValues) => {
    const { search } = data;

    const newKeyword = {
      id: Date.now(),
      text: search,
    };

    setKeywords(prev => {
      const oldIndex = prev.findIndex(_keyword => _keyword.text === search);
      const newKeywords = oldIndex >= 0 ? [...prev.slice(0, oldIndex), ...prev.slice(oldIndex + 1)] : prev;
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

  return (
    <div className={styles.layout}>
      <Header.Root className={styles.header}>
        <form onSubmit={handleSubmit(handleSearch)}>
          <SearchInput placeholder="우리집 할미견 치아건강 책임질 효소치약" {...register('search')} />
        </form>
      </Header.Root>
      <div className={styles.recommendedBox}>
        <CardSliderRecommended title="이런 상품 찾고 있나요?" />
      </div>
      {keywords.map(keyword => (
        <p key={keyword.id}>{keyword.text}</p>
      ))}
      <FloatingBox>
        <NavBottom />
      </FloatingBox>
    </div>
  );
}
