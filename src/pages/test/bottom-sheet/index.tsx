import BottomSheet from '@/components/common/Modal/Bottom/BottomSheet';
import useBottomSheet from '@/hooks/useBottomSheet';
import useModal from '@/hooks/useModal';
import useToast from '@/hooks/useToast';
import { useEffect } from 'react';

const BOTTOM_SHEET_ID = 'bottomSheetId';

export default function BottomSheetPage() {
  const { onDragEnd, controls, isOpen, openHandler, closeHandler } = useBottomSheet();
  const { showToast, setPortalId } = useToast();

  useEffect(() => {
    console.log('useEffect');

    const interval = setInterval(() => {
      showToast({
        status: 'success',
        message: '토스트 입니다.',
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [showToast]);

  return (
    <>
      <button
        onClick={() => {
          setPortalId(BOTTOM_SHEET_ID);
          openHandler();
        }}>
        모달 열기
      </button>
      <button
        type="button"
        onClick={() => {
          showToast({
            status: 'success',
            message: '토스트 입니다.',
          });
        }}>
        토스트
      </button>
      <BottomSheet
        id={BOTTOM_SHEET_ID}
        onDragEnd={onDragEnd}
        controls={controls}
        isOpen={isOpen}
        onClose={() => {
          setPortalId();
          closeHandler();
        }}>
        <button onClick={() => closeHandler()}>최신순</button>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
        <span>Content아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
      </BottomSheet>
    </>
  );
}
