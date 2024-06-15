import { PropsWithChildren, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './BottomModal.module.scss';
import useOutsideClick from '@/hooks/useOutsideClick';

const cx = classNames.bind(styles);

interface BottomModalProps extends PropsWithChildren {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  hasBackdrop?: boolean;
}

export default function BottomModal({ id, isOpen, onClose, hasBackdrop = true, children }: BottomModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, onClose);

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
      {isOpen && <div className={cx('backdrop', { show: hasBackdrop })} />}
      <div id={id} className={styles.container} ref={containerRef}>
        {isOpen && <div className={styles.modal}>{children}</div>}
      </div>
    </>
  );
}
