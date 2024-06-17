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

/*
  바닥에 고정된 모달 형태의 베이스입니다.
  페이지 컴포넌트에서 아래 예시처럼 사용하셔도 되고 이 컴포넌트를 사용해서 따로 컴포넌트를 만드셔도 됩니다.

  사용⭐️)
  export default function Example() {
    const { modalOpen, handleModalOpen, handleModalClose } = useModal();

    return (
      <div>
        <button type="button" onClick={handleModalOpen}>모달 오픈</div>

        <BottomModal isOpen={modalOpen} onClose={handleModalClose}>
          <div>모달 내용</div>
        </BottomModal>
      </div>
    )
  }
*/
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
