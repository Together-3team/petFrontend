import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import { AnimationProps, PanInfo, motion } from 'framer-motion';
import classNames from 'classnames/bind';

import styles from './BottomSheet.module.scss';
import Header from '@/components/common/Modal/BottomSheet/Header';
import useOutsideClick from '@/hooks/useOutsideClick';
import useBottomSheet from '@/hooks/useBottomSheet';

// 사용 예시 (토스트와 함께 사용할 때)
// const BOTTOM_SHEET_ID = 'bottomSheetId';

// export default function BottomSheetPage() {
//   const { onDragEnd, controls, isOpen, openHandler, closeHandler } = useBottomSheet();
//   const { showToast, setPortalId } = useToast();

//   return (
//     <>
//       <button
//         onClick={() => {
//           setPortalId(BOTTOM_SHEET_ID);
//           openHandler();
//         }}>
//         모달 열기
//       </button>
//       <button
//         type="button"
//         onClick={() => {
//           showToast({
//             status: 'success',
//             message: '토스트 입니다.',
//           });
//         }}>
//         토스트
//       </button>
//       <BottomSheet
//         id={BOTTOM_SHEET_ID}
//         onDragEnd={onDragEnd}
//         controls={controls}
//         isOpen={isOpen}
//         onClose={() => {
//           setPortalId();
//           closeHandler();
//         }}>
//         <button onClick={() => closeHandler()}>최신순</button>
//         <span>Content</span>
//       </BottomSheet>
//     </>
//   );
// }

// 사용 예시 (그냥 쓸 때)
// export default function BottomSheetPage() {
//   const { onDragEnd, controls, isOpen, openHandler, closeHandler } = useBottomSheet();

//   return (
//     <>
//       <button
//         onClick={() => {
//           openHandler();
//         }}>
//         모달 열기
//       </button>
//       <BottomSheet
//         id={BOTTOM_SHEET_ID}
//         onDragEnd={onDragEnd}
//         controls={controls}
//         isOpen={isOpen}
//         onClose={() => {
//           closeHandler();
//         }}>
//         <button onClick={() => closeHandler()}>최신순</button>
//         <span>Content</span>
//       </BottomSheet>
//     </>
//   );
// }
const cx = classNames.bind(styles);

interface BottomSheetProps {
  id?: string;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  controls: Pick<AnimationProps, 'animate'>['animate'];
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({ id, onDragEnd, controls, isOpen, onClose, children }: BottomSheetProps) {
  const [windowHeight, setWindowHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => onClose());

  useEffect(() => {
    // 클라이언트 측에서 window.innerHeight 값을 설정
    setWindowHeight(window.innerHeight);

    // 창 크기 변경 시 업데이트
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const calculatedHeight = contentRef.current ? contentRef.current.clientHeight + 1048 : windowHeight;

  return (
    <div className={cx('container')} ref={containerRef}>
      <div id={id} className={styles.test}>
        <motion.div
          className={cx('wrapper')}
          drag="y"
          onDragEnd={onDragEnd}
          initial="hidden"
          animate={controls}
          transition={{
            type: 'spring',
            damping: 40,
            stiffness: 400,
          }}
          variants={{
            visible: { y: 0 },
            hidden: { y: '100%' },
          }}
          dragConstraints={{ top: 0 }}
          dragElastic={0.2}
          style={{ height: calculatedHeight }}>
          <Header />
          <motion.div className={cx('contentWrapper')} ref={contentRef}>
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
