import BottomSheet from '@/components/common/Modal/BottomSheet';
import useModal from '@/hooks/useModal';

export default function BottomSheetPage() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <>
      <button onClick={handleModalOpen}>모달 열기</button>
      <BottomSheet modalOpen={modalOpen} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose}>
        <span>Content</span>
      </BottomSheet>
    </>
  );
}
