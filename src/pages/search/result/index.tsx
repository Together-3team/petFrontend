import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './SearchResultPage.module.scss';
import Header from '@/components/common/Layout/Header';
import CartButton from '@/components/common/Button/Cart';
import GitHubBox from '@/components/common/GitHubBox';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import NavBottom from '@/components/common/Nav/Bottom';
import SortButton from '@/components/common/Button/Sort';
import useToast from '@/hooks/useToast';
import ScrollTopButton from '@/components/common/Button/ScrollTop';
import CardListBasic from '@/components/common/Card/CardList/Basic';
import SearchInput from '@/components/common/Input/SearchInput';
import { Keyword } from '@/types/components/search.types';
import { SearchFormValues, searchSchema } from '@/utils/searchSchema';
import BackButton from '@/components/common/Button/BackButton';

const SORT_OPTIONS = [
  { name: '최신순', value: '0' },
  { name: '별점 높은 순', value: '1' },
  { name: '별점 낮은 순', value: '2' },
  { name: '가격 높은 순', value: '3' },
  { name: '가격 낮은 순', value: '4' },
];

const BOTTOM_BOX_ID = 'bottomBox';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { keyword, orderBy } = context.query;

  return {
    props: {
      keyword: keyword || '',
      orderBy: orderBy || '0',
    },
  };
}

interface ProductCategoryPageProps {
  keyword: string;
  orderBy: string;
}

export default function SearchResultPage({ keyword, orderBy }: ProductCategoryPageProps) {
  const router = useRouter();
  const { showToast, setPortalId } = useToast(BOTTOM_BOX_ID);

  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      search: keyword,
    },
  });

  const handleSearch = (data: SearchFormValues) => {
    const { search } = data;

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

    router.replace({
      pathname: '/search/result',
      query: {
        keyword: search,
      },
    });
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
        <Header.Box className={styles.headerBox}>
          <Header.Left>
            <BackButton href="/search" />
          </Header.Left>
          <Header.Center className={styles.headerCenter}>
            <form onSubmit={handleSubmit(handleSearch)} className={styles.searchBox}>
              <SearchInput autoFocus {...register('search')} />
            </form>
          </Header.Center>
          <Header.Right>
            <CartButton />
          </Header.Right>
        </Header.Box>
      </Header.Root>
      <div className={styles.sortBox}>
        <SortButton
          options={SORT_OPTIONS}
          initialOptionValue={orderBy}
          onClick={value => {
            router.replace({
              pathname: '/search/result',
              query: {
                ...router.query,
                orderBy: value,
              },
            });
          }}
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.contents}>
        <CardListBasic keyword={keyword} orderBy={orderBy} />
      </div>
      <GitHubBox />
      <FloatingBox id={BOTTOM_BOX_ID}>
        <NavBottom />
        <div className={styles.floatingActionBox}>
          <ScrollTopButton />
        </div>
      </FloatingBox>
    </div>
  );
}
