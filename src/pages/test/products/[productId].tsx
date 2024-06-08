import { NextPageContext } from 'next';

type ProductDetailPageProps = {
  productId: string;
};

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
  return (
    <>
      <h1>[{productId}] ProductDetailPage</h1>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;

  return {
    props: {
      productId: query.productId,
    },
  };
}
