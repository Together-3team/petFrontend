import classNames from 'classnames/bind';
import styles from './EmptyView.module.scss';

const cx = classNames.bind(styles);

export default function DeliveryEmptyView() {
  return (
    <>
      {' '}
      <div className={cx('deliveryEmptyView')}>아직 배송지가 등록되지 않았어요.</div>
      <button>배송지 추가 버튼</button>
    </>
  );
}
