import classNames from 'classnames/bind';
import useModal from '@/hooks/useModal';
import Input from '@/components/common/Input';
import BottomModal from '@/components/common/Modal/BottomModal';
import Button from '@/components/common/Button';
import styles from './My.module.scss';

const cx = classNames.bind(styles);

export default function My() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <>
      <div className={cx('my')}>
        <Input id="이메일" type="email" label="이메일" size={'large'} background={'background'} placeholder=" " />
        <Input id="이름" type="text" label="이름" size={'large'} background={'background'} placeholder=" " />
        <div onClick={handleModalOpen}>모달 열기</div>
        <BottomModal
          className={cx('')}
          modalOpen={modalOpen}
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}>
          <div className={cx('modalSize')}>
            <span>배송지를 삭제하시겠습니까?</span>
            <div className={cx('buttonArea')}>
              <Button size="medium" backgroundColor="$color-white" onClick={handleModalClose}>
                취소
              </Button>
              <Button size="medium" backgroundColor="$color-gray-800">
                삭제
              </Button>
            </div>
          </div>
        </BottomModal>
      </div>
    </>
  );
}
