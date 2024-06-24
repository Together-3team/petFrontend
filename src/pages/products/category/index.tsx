import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import styles from './ProductCategoryPage.module.scss';
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
import ProductTypeButton from '@/components/common/Button/ProductType';
import FloatingActionBox from '@/components/common/Layout/Footer/FloatingActionBox';
import CardListCategory from '@/components/common/Card/CardList/Category';

const BOTTOM_BOX_ID = 'bottomBox';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { petType, productType, orderBy } = context.query;

  return {
    props: {
      petType: petType || '0',
      productType: productType || '0',
      orderBy: orderBy || '0',
    },
  };
}

interface ProductCategoryPageProps {
  petType: string;
  productType: string;
  orderBy: string;
}

export default function ProductCategoryPage({ petType, productType, orderBy }: ProductCategoryPageProps) {
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
      <div className={styles.productTypeBox}>
        <ProductTypeButton
          initialProductType={productType}
          onClick={productType =>
            router.replace({
              pathname: '/products/category',
              query: {
                ...router.query,
                productType: productType.isSelected ? productType.value : '0',
              },
            })
          }
        />
      </div>
      <CardListCategory petType={petType} productType={productType} orderBy={orderBy} />
      <FloatingBox id={BOTTOM_BOX_ID}>
        <NavBottom />
        <FloatingActionBox>
          <ScrollTopButton />
          <PetToggleButton
            initialPetType={petType}
            onClick={petType => {
              router.replace({
                pathname: '/products/category',
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
