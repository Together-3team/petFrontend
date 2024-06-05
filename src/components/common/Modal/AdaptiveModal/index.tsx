import classNames from 'classnames/bind';
import { useModalProps } from '@/hooks/useModal';
import ModalBase, { ModalProps } from '@/components/common/Modal/AdaptiveModal/ModalBase';
import styles from './AdaptiveModal.module.scss';
import { PropsWithChildren, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const cx = classNames.bind(styles);

export default function AdaptiveModal({
  modalOpen,
  handleModalOpen,
  handleModalClose,
  type,
  className,
  children,
}: PropsWithChildren<useModalProps & ModalProps>) {
  const modalRef = useRef(null);
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const openModal = () => {
    api.start({ y: 0 });
    handleModalOpen();
  };

  const closeModal = () => {
    api.start({ y: window.innerHeight });
    setTimeout(handleModalClose, 300);
  };

  const bind = useDrag(
    ({ down, movement: [, my], direction: [, dy], velocity }) => {
      if (down && dy > 0 && my > 100) {
        closeModal();
      } else {
        api.start({ y: down ? my : 0 });
      }
    },
    { initial: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
  );

  return (
    <div
      className={cx('modalWrapper')}
      onClick={e => {
        if (e.target === e.currentTarget) {
          type === 'drawer' ? closeModal() : handleModalClose();
        }
      }}>
      {modalOpen && (
        <ModalBase type={type} className={className} onClose={type === 'drawer' ? closeModal : handleModalClose}>
          <animated.div
            ref={modalRef}
            {...bind()}
            style={{ transform: y.to(y => `translateY(${y}px)`) }}
            className={cx('modalContent', { [type]: type })}>
            {children}
          </animated.div>
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
