import { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';
import ModalPortal from '@/components/common/Modal/Portal';
import styles from './BottomShareModal.module.scss';

export interface ModalProps {
  type: 'bottom' | 'share';
  className?: string;
  onClose?: () => void;
}

const cx = classNames.bind(styles);

export default function ModalBase({ type, className, children }: PropsWithChildren<ModalProps>) {
  return (
    <ModalPortal>
      <div className={cx('modalBackground')} data-type={type}>
        <div className={cx('modalBase', className)} data-type={type}>
          <div className={cx('modalContent')} data-type={type}>
            {children}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
