import { motion } from 'framer-motion';
import useBottomSheet from '@/hooks/useBottomSheet';

import Header from './Header';
import classNames from 'classnames/bind';
import styles from './BottomSheet.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

interface BottomSheet {
  onDragEnd: any;
  controls: any;
  isOpen: boolean;
  setIsOpen: any;
  children: any;
}

export default function BottomSheet({ onDragEnd, controls, isOpen, setIsOpen, children }: BottomSheet) {
  const [windowHeight, setWindowHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

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
    <div className={cx('container')} style={{ height: windowHeight }}>
      {isOpen && <motion.div className={cx('background')} onClick={() => setIsOpen(false)} />}

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
  );
}

// import styles from './BottomSheet.module.scss'
// import { motion } from "framer-motion"
// import classNames from 'classnames/bind';
// const cx = classNames.bind(styles);
// import { useMemo, useState } from 'react';

// const BottomSheet = () => {
//   const [contentRef, contentBounds] = useMeasure();
//   const [isOpened, setIsOpened] = useState(false);
//   const animateState = isOpened ? "opened" : "closed";
// const headerHeight = 50

// const expandedHeight = useMemo(
//   () => Math.min(contentBounds.height + headerHeight, window.innerHeight - headerHeight),
//   [contentBounds.height]
// );

// onDragEnd={(event, info) => {
//   // y가 음수이면 위로, 양수이면 아래로

//   const offsetThreshold = 150;
//   const deltaThreshold = 5;

//   const isOverOffsetThreshold = Math.abs(info.offset.y) > offsetThreshold;
//   const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;

//   const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;

//   if (!isOverThreshold) return;

//   const newIsOpened = info.offset.y < 0;

//   setIsOpened(newIsOpened);
// }}
//   return (
//     <>
//     <motion.div
//     className={cx('backgroundOverlay')}
//         variants={{
//           opened: {
//             backdropFilter: 'blur(1px)',
//             pointerEvents: 'all',
//             opacity: 0.7,
//           },
//           closed: {
//             backdropFilter: 'blur(0px)',
//             pointerEvents: 'none',
//             opacity: 0,
//           },
//         }}
//       />
//     <motion.div
//     className={cx('sheetBackground')}
//     animate={animateState}
//     variants={{
//       opened: { top: `calc(100dvh - ${expandedHeight}px)` },
//       closed: { top: `calc(100dvh - 60px)` },
//     }}
//         drag="y"
//         dragConstraints={{ top: 0, bottom: 0 }}
//         dragElastic={0.2}
//         onTap={() => setIsOpned(!isOpened)}
//       >
//         <BottomHeader>
//           <HandleBar style={{ borderRadius: 9999 }} />
//         </BottomHeader>
//         <SheetContentWrapper
//   drag="y"
//   dragConstraints={{ top: 0, bottom: 0 }}
//   dragElastic={false}
//   style={{ height: 500, zIndex: 999 }}
//   ref={contentRef}
// >
//   <SheetContent>{children}</SheetContent>
// </SheetContentWrapper>
//       </motion.div>
//       </>
//   );
// };
