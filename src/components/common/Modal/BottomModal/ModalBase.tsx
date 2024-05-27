import { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';
import ModalPortal from '@/components/common/Modal/Portal';
import styles from './BottomModal.module.scss';

export interface ModalProps {
  className?: string;
  onClose?: () => void;
}

const cx = classNames.bind(styles);

export default function ModalBase({ className, children }: PropsWithChildren<ModalProps>) {
  return (
    <ModalPortal>
      <div className={cx('modalBase', className)}>
        <div className={cx('modalContent')}>{children}</div>
      </div>
    </ModalPortal>
  );
}
