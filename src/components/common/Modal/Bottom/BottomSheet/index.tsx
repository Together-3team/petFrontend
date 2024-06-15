import { PointerEvent, PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import { PanInfo, motion, useAnimation, useDragControls } from 'framer-motion';
import useMeasure from 'react-use-measure';
import classNames from 'classnames/bind';

import styles from './BottomSheet.module.scss';
import useOutsideClick from '@/hooks/useOutsideClick';
import usePreviousValue from '@/hooks/usePreviousValue';

const cx = classNames.bind(styles);

interface BottomSheetProps extends PropsWithChildren {
  id?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  hasBackdrop?: boolean;
}

export default function BottomSheet({ id, isOpen, onOpen, onClose, hasBackdrop = true, children }: BottomSheetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [headerRef, headerBounds] = useMeasure();
  const [contentsRef, contentsBounds] = useMeasure();
  const controls = useAnimation();
  const dragControls = useDragControls();
  const prevIsOpen = usePreviousValue(isOpen);

  useOutsideClick(containerRef, () => onClose());

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
      onOpen();
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
        document.body.style.overflowY = 'auto';
      } else if (!prevIsOpen && isOpen) {
        controls.start('visible');
        document.body.style.overflowY = 'hidden';
      }
    };
    toggleModal();
    return () => toggleModal();
  }, [controls, isOpen, prevIsOpen]);

  return (
    <>
      {isOpen && <motion.div className={cx('backdrop', { show: hasBackdrop })} />}
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
        ref={containerRef}
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
    </>
  );
}
