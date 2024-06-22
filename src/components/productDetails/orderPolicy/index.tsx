import Button from '@/components/common/Button';
import classNames from 'classnames/bind';
import styles from './OrderPolicy.module.scss';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);
export default function OrderPolicy() {
  const router = useRouter();
  const handlePolicyButtonClick = () => {
    router.replace('/refund/policy');
  };
  return (
    <div className={cx('contents')}>
      <Button size="large" backgroundColor="$color-gray-100" onClick={handlePolicyButtonClick}>
        주문 취소/ 교환/ 반품 안내
      </Button>
    </div>
  );
}
