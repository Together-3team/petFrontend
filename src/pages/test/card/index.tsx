import Card from '@/components/common/Card';
import styles from './Card.module.scss';
import rectangleImg from '@/assets/images/rectangle.png';
import Zzim from '@/components/common/Zzim';

export default function CardPage() {
  const productList = {
    productId: 1,
    title: '진짜 육포',
    thumbNailImage: rectangleImg.src,
    originalPrice: 15000,
    price: 12000,
    starRating: 4.5,
    reviewCount: 200,
    stock: 3,
  };
  const productList2 = {
    productId: 2,
    title: '진짜 육포입니다람쥐이이이이이이이이이',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    price: 10800,
    starRating: 4.5,
    reviewCount: 200,
    stock: 3,
  };
  const productList3 = {
    productId: 3,
    title: '진짜 육포입니다람쥐이이이이이이이이이',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    price: 10800,
    option: '닭가슴살맛',
    quantity: 2,
    stock: 10,
  };
  const productList6 = {
    productId: 6,
    title: '진짜 육포입니다람쥐이이이이이이이이이',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    price: 10800,
    option: '닭가슴살맛',
    quantity: 2,
    stock: 0,
  };
  const productList4 = {
    productId: 1,
    title: '진짜 육포라니이이이이이잉',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    price: 10800,
    starRating: 4.5,
    reviewCount: 200,
    stock: 3,
  };
  const productList5 = {
    productId: 1,
    title: '진짜 육포다라마바사아자차카타파하호호호호히히히히히히히히햏헤해햏',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    price: 10800,
    starRating: 4.5,
    reviewCount: 200,
    stock: 3,
  };
  const productList7 = {
    productId: 1,
    title: '진짜 육포다라마바사아자차카타파하호호호호히히히히히히히히햏헤해햏',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    price: 10800,
    starRating: 4.5,
    reviewCount: 200,
    stock: 0,
  };
  return (
    <div className={styles.cards}>
      <Card productInfo={productList} size="big" />
      <Card productInfo={productList} size="small" />
      <Card productInfo={productList2} isZzim={true} size="big" />
      <Zzim className={styles.zzim} color="gray" productId={2} />
      <Card productInfo={productList3} direction="row" size="small" />
      <Card productInfo={productList6} direction="row" size="small" />
      <Card productInfo={productList4} size="big" />
      <Card productInfo={productList5} size="big" />
      <Card productInfo={productList7} size="big" />
    </div>
  );
}
