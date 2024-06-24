import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import styles from './ProductHotPage.module.scss';
import Header from '@/components/common/Layout/Header';
import LogoFull from '@/components/common/Icon/LogoFull';
import SearchButton from '@/components/common/Button/Search';
import CartButton from '@/components/common/Button/Cart';
import NavTop from '@/components/common/Nav/Top';
import GitHubBox from '@/components/common/GitHubBox';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import NavBottom from '@/components/common/Nav/Bottom';
import SortButton from '@/components/common/Button/Sort';
import useToast from '@/hooks/useToast';
import PetToggleButton from '@/components/common/Button/PetToggle';
import ScrollTopButton from '@/components/common/Button/ScrollTop';
import CardListHot from '@/components/common/Card/CardList/Hot';
import FloatingActionBox from '@/components/common/Layout/Footer/FloatingActionBox';

const SORT_OPTIONS = [
  { name: '최신순', value: '0' },
  { name: '별점 높은 순', value: '1' },
  { name: '별점 낮은 순', value: '2' },
  { name: '가격 높은 순', value: '3' },
  { name: '가격 낮은 순', value: '4' },
];

const BOTTOM_BOX_ID = 'bottomBox';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { petType, orderBy } = context.query;

  return {
    props: {
      petType: petType || '0',
      orderBy: orderBy || '0',
    },
  };
}

interface ProductHotPageProps {
  petType: string;
  orderBy: string;
}

export default function ProductHotPage({ petType, orderBy }: ProductHotPageProps) {
  const router = useRouter();
  const { showToast, setPortalId } = useToast(BOTTOM_BOX_ID);

  return (
    <div className={styles.layout}>
      <Header.Root className={styles.header}>
        <Header.Box className={styles.headerBox}>
          <Header.Left>
            <LogoFull />
          </Header.Left>
          <Header.Right>
            <SearchButton />
            <CartButton />
          </Header.Right>
        </Header.Box>
        <NavTop />
      </Header.Root>
      <div className={styles.sortBox}>
        <SortButton
          options={SORT_OPTIONS}
          initialOptionValue={orderBy}
          onClick={value => {
            router.replace({
              pathname: '/products/hot',
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
        <CardListHot petType={petType} orderBy={orderBy} />
      </div>
      <GitHubBox />
      <FloatingBox id={BOTTOM_BOX_ID}>
        <NavBottom />
        <FloatingActionBox>
          <ScrollTopButton />
          <PetToggleButton
            initialPetType={petType}
            onClick={petType => {
              router.replace({
                pathname: '/products/hot',
                query: {
                  ...router.query,
                  petType: petType.value,
                },
              });
            }}
          />
        </FloatingActionBox>
      </FloatingBox>
    </div>
  );
}
