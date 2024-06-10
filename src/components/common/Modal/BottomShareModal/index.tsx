import classNames from 'classnames/bind';
import { useModalProps } from '@/hooks/useModal';
import ModalBase, { ModalProps } from '@/components/common/Modal/BottomShareModal/ModalBase';
import styles from './BottomShareModal.module.scss';
import { PropsWithChildren } from 'react';

const cx = classNames.bind(styles);

export default function BottomShareModal({
  modalOpen,
  handleModalOpen,
  handleModalClose,
  type,
  className,
  children,
}: PropsWithChildren<useModalProps & ModalProps>) {
  return (
    <div
      className={cx('modalWrapper')}
      onClick={e => {
        if (e.target === e.currentTarget) {
          handleModalClose();
        }
      }}>
      {modalOpen && (
        <ModalBase type={type} className={className} onClose={handleModalClose}>
          {children}
        </ModalBase>
      )}
    </div>
  );
}

{
  /* 사용법
1. 사용처에서 import useModal from '@/hooks/useModal';
2. 사용처에서 import BottomShareModal from '@/components/common/BottomShareModal';

  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  return (
    <>
            <BottomShareModal
              type='bottom' 또는 type='share'
              className={cx('')}
              modalOpen={modalOpen}
              handleModalOpen={handleModalOpen}
              handleModalClose={handleModalClose}>
              *모달 내부 디자인 추가*
            </BottomShareModal>
    </>
  );
  사용 예시는 pages > text > my.tsx에서 확인할 수 있습니다.
*/
}
