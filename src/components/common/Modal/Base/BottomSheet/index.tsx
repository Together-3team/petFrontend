import { PointerEvent, PropsWithChildren, useEffect, useMemo } from 'react';
import { PanInfo, motion, useAnimation, useDragControls } from 'framer-motion';
import useMeasure from 'react-use-measure';
import classNames from 'classnames/bind';

import styles from './BottomSheet.module.scss';
import usePreviousValue from '@/hooks/usePreviousValue';
import Portal from '@/components/common/Portal';

const cx = classNames.bind(styles);

interface BottomSheetProps extends PropsWithChildren {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  hasBackdrop?: boolean;
}

/*
  바닥에 고정된 드래그 모달 형태의 베이스입니다.
  페이지 컴포넌트에서 아래 예시처럼 사용하셔도 되고 이 컴포넌트를 사용해서 따로 컴포넌트를 만드셔도 됩니다.

  사용⭐️)
  export default function Example() {
    const { modalOpen, handleModalOpen, handleModalClose } = useModal();

    return (
      <div>
        <button type="button" onClick={handleModalOpen}>모달 오픈</div>

        <BottomSheet isOpen={modalOpen} onClose={handleModalClose}>
          <div>모달 내용</div>
        </BottomSheet>
      </div>
    )
  }
*/
export default function BottomSheet({ id, isOpen, onClose, hasBackdrop = true, children }: BottomSheetProps) {
  const [headerRef, headerBounds] = useMeasure();
  const [contentsRef, contentsBounds] = useMeasure();
  const controls = useAnimation();
  const dragControls = useDragControls();
  const prevIsOpen = usePreviousValue(isOpen);

  const expandedHeight = useMemo(() => {
    return contentsBounds.height + headerBounds.height;
  }, [contentsBounds.height, headerBounds.height]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    event.preventDefault();

    const shouldClose = info.point.y > 20 || (info.point.y >= 0 && info.point.y > 45);

    if (shouldClose) {
      controls.start('hidden');
      onClose();
    } else {
      controls.start('visible');
    }
  };

  const handleHeaderPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    window.getSelection()?.removeAllRanges();
    dragControls.start(e);
  };

  useEffect(() => {
    const toggleModal = () => {
      if (prevIsOpen && !isOpen) {
        controls.start('hidden');
        // document.body.style.overflowY = 'auto';
      } else if (!prevIsOpen && isOpen) {
        controls.start('visible');
        // document.body.style.overflowY = 'hidden';
      }
    };
    toggleModal();
    return () => toggleModal();
  }, [controls, isOpen, prevIsOpen]);

  return (
    <Portal id="rootModal">
      {isOpen && <motion.div className={cx('backdrop', { show: hasBackdrop })} onClick={onClose} />}
      <motion.div
        id={id}
        className={styles.container}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragListener={false}
        dragControls={dragControls}
        animate={controls}
        onDragEnd={handleDragEnd}
        initial="hidden"
        variants={{
          visible: {
            top: '100vh',
          },
          hidden: {
            top: '100vh',
          },
        }}
        style={{ height: `calc(100vh - ${expandedHeight}px)` }}>
        {isOpen && (
          <div>
            <div className={styles.wrapper}>
              <div
                className={styles.header}
                onPointerDown={handleHeaderPointerDown}
                style={{ touchAction: 'none' }}
                ref={headerRef}>
                <div className={styles.handle} />
              </div>
              <div className={styles.contents} ref={contentsRef}>
                {children}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </Portal>
  );
}
