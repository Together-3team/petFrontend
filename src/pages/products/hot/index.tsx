import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import styles from './ProductHotPage.module.scss';
import Header from '@/components/common/Layout/Header';
import LogoFull from '@/components/common/Icon/LogoFull';
import SearchButton from '@/components/common/Button/Search';
import CartButton from '@/components/common/Button/Cart';
import NavTop from '@/components/common/Nav/Top';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import NavBottom from '@/components/common/Nav/Bottom';
import useToast from '@/hooks/useToast';
import PetToggleButton from '@/components/common/Button/PetToggle';
import ScrollTopButton from '@/components/common/Button/ScrollTop';
import CardListHot from '@/components/common/Card/CardList/Hot';
import FloatingActionBox from '@/components/common/Layout/Footer/FloatingActionBox';

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
      <CardListHot petType={petType} orderBy={orderBy} />
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
