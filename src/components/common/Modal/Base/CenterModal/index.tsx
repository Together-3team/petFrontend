import { PropsWithChildren, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './CenterModal.module.scss';
import Portal from '@/components/common/Portal';

const cx = classNames.bind(styles);

interface CenterModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  hasBackdrop?: boolean;
}

/*
  가운데 고정된 모달 형태의 베이스입니다.
  페이지 컴포넌트에서 아래 예시처럼 사용하셔도 되고 이 컴포넌트를 사용해서 따로 컴포넌트를 만드셔도 됩니다.

  사용⭐️)
  export default function Example() {
    const { modalOpen, handleModalOpen, handleModalClose } = useModal();

    return (
      <div>
        <button type="button" onClick={handleModalOpen}>모달 오픈</div>

        <CenterModal isOpen={modalOpen} onClose={handleModalClose}>
          <div>모달 내용</div>
        </CenterModal>
      </div>
    )
  }
*/
export default function CenterModal({ isOpen, onClose, hasBackdrop = true, children }: CenterModalProps) {
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
