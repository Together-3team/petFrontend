import { useState } from 'react';
import useModal from '@/hooks/useModal';
import classNames from 'classnames/bind';
import ModalBase from '@/components/common/BottomModal/ModalBase';
import styles from './BottomModal.module.scss';

const cx = classNames.bind(styles);

export default function BottomModal({ children }) {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  return (
    <div
      className={cx('modalWrapper')}
      onClick={e => {
        if (e.target === e.currentTarget) {
          handleModalClose();
        }
      }}>
      <div onClick={handleModalOpen} style={{ cursor: 'pointer' }}>
        모달 열기
      </div>
      {modalOpen && (
        <ModalBase size={''} onClose={handleModalClose}>
          {children}
        </ModalBase>
      )}
    </div>
  );
}
