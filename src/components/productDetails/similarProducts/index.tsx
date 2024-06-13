import Button from '@/components/common/Button';
import classNames from 'classnames/bind';
import styles from './SimilarProducts.module.scss';

const cx = classNames.bind(styles);
export default function SimilarProducts() {
  return <div className={cx('contents')}>similar</div>;
}
