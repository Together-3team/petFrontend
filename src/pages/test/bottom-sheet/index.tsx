import { useEffect } from 'react';

import useModal from '@/hooks/useModal';
import useToast from '@/hooks/useToast';
import BottomSheet from '@/components/common/Modal/Base/BottomSheet';

const BOTTOM_SHEET_ID = 'bottomSheetId';

export default function BottomSheetPage() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
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
          handleModalOpen();
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
        isOpen={modalOpen}
        onClose={() => {
          setPortalId();
          handleModalClose();
        }}>
        <div style={{ height: '300px', overflowY: 'auto' }}>
          <span>Content아아아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
          <span>Content아아아아아아아아아아아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</span>
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
        </div>
      </BottomSheet>
    </>
  );
}
