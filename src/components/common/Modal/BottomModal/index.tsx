import { PropsWithChildren, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './BottomModal.module.scss';

const cx = classNames.bind(styles);

interface BottomModalProps extends PropsWithChildren {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  hasBackdrop?: boolean;
}

export default function BottomModal({ id, isOpen, onClose, hasBackdrop = true, children }: BottomModalProps) {
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
      {isOpen && <div className={cx('backdrop', { show: hasBackdrop })} onClick={onClose} />}
      <div id={id} className={styles.container}>
        {isOpen && <div className={styles.modal}>{children}</div>}
      </div>
    </>
  );
}
