import classNames from 'classnames/bind';
import styles from './DetailedDescription.module.scss';

const cx = classNames.bind(styles);
export default function DetailedDescription() {
  return <div className={cx('contents')}>DetailedDescription</div>;
}
