import classNames from 'classnames/bind';
import useModal from '@/hooks/useModal';
import Input from '@/components/common/Input';
import BottomShareModal from '@/components/common/Modal/BottomShareModal';
import Button from '@/components/common/Button';
import styles from './My.module.scss';
import PetToggleButton from '@/components/common/Button/PetToggle';
import Header from '@/components/common/Layout/Header';
import NavTop from '@/components/common/Nav/Top';
import NavBottom from '@/components/common/Nav/Bottom';

const cx = classNames.bind(styles);

const CATEGORIES = ['전체', '강아지', '고양이'];

export default function My() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <>
      <div className={styles.floatingBox}>
        <PetToggleButton
          categories={CATEGORIES}
          initialActiveCategory={CATEGORIES[0]}
          onClick={category => console.log(category)}
        />
      </div>
      <div className={cx('my')}>
        <Header.Root>
          <Header.Box>
            <Header.Left>왼쪽</Header.Left>
            <Header.Center>
              <div>안녕하세요</div>
            </Header.Center>
            <Header.Right>오른쪽</Header.Right>
          </Header.Box>
          <NavTop />
        </Header.Root>
        <Input id="이메일" type="email" label="이메일" size={'large'} background={'background'} placeholder=" " />
        <Input id="이름" type="text" label="이름" size={'large'} background={'background'} placeholder=" " />
        <div onClick={handleModalOpen}>모달 열기</div>
        <BottomShareModal
          type="bottom"
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
        </BottomShareModal>
      </div>
      <NavBottom />
    </>
  );
}
