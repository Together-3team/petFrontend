import { motion } from 'framer-motion';

import classNames from 'classnames/bind';
import styles from './BottomSheet.module.scss';

const cx = classNames.bind(styles);

export default function Header() {
  return (
    <motion.div className={cx('headerWrapper')}>
      <motion.div className={cx('handleBar')} />
    </motion.div>
  );
}
