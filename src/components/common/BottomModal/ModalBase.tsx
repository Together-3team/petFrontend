import { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';
import styles from './BottomModal.module.scss';

interface ModalProps {
  size: string;
  onClose: () => void;
}

const cx = classNames.bind(styles);

export default function ModalBase({ size, onClose, children }: PropsWithChildren<ModalProps>) {
  return (
    <div className={cx('modalBase', size)} onClick={onClose}>
      <div className={cx('modalContent')} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
