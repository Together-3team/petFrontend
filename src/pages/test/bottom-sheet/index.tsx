import BottomSheet from '@/components/common/Modal/BottomSheet';
import useBottomSheet from '@/hooks/useBottomSheet';
import useModal from '@/hooks/useModal';

export default function BottomSheetPage() {
  const { onDragEnd, controls, isOpen, setIsOpen } = useBottomSheet();

  return (
    <>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>
      <BottomSheet onDragEnd={onDragEnd} controls={controls} isOpen={isOpen} setIsOpen={setIsOpen}>
        <span>Content</span>
      </BottomSheet>
    </>
  );
}
