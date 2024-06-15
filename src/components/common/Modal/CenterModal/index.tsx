import { PropsWithChildren, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './CenterModal.module.scss';
import Portal from '@/components/common/Portal';

const cx = classNames.bind(styles);

interface CenterModalProps extends PropsWithChildren {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  hasBackdrop?: boolean;
}

export default function CenterModal({ id, isOpen, onClose, hasBackdrop = true, children }: CenterModalProps) {
  useEffect(() => {
    const toggleModal = () => {
      if (isOpen) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'auto';
      }
    };
    toggleModal();
    return () => toggleModal();
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <Portal id="rootModal">
          <div className={styles.wrapper}>
            <div className={cx('backdrop', { show: hasBackdrop })} onClick={onClose} />
            <div className={styles.container}>
              <div className={styles.modal}>{children}</div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
