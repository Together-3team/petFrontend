import { useRef } from 'react';
import useModal from '@/hooks/useModal';
import Header from '@/components/common/Layout/Header';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import BackButton from '@/components/common/BackButton';
import BottomShareModal from '@/components/common/Modal/BottomShareModal';
import Sample from '@/assets/exampleProductImg.jpg';

import styles from './Info.module.scss';
import ImageBox from '@/components/common/ImageBox';
import useOutsideClick from '@/hooks/useOutsideClick';

export default function Info() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(containerRef, () => handleModalClose());

  return (
    <div className={styles.infoLayout} ref={containerRef}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <h1>회원 정보</h1>
        </Header.Box>
      </Header.Root>
      <div className={styles.infoField}>
        <form className={styles.memberForm}>
          <div className={styles.inputArea}>
            <Input
              id="email"
              type="email"
              size="large"
              label="이메일"
              labelStyle={'label'}
              placeholder="kyeonjoo@kakao.com"
            />
            <Input
              id="phoneNumber"
              type="tel"
              size="large"
              label="연락처"
              labelStyle={'label'}
              placeholder="000-0000-0000"
            />
          </div>
          <Button size="large" backgroundColor="$color-pink-main">
            저장
          </Button>
        </form>
        <div className={styles.quitText} onClick={handleModalOpen}>
          회원탈퇴
        </div>
        {handleModalOpen && (
          <BottomShareModal
            type="bottom"
            modalOpen={modalOpen}
            handleModalOpen={handleModalOpen}
            handleModalClose={handleModalClose}>
            <div className={styles.modalSize}>
              <span className={styles.modalTitle}>정말로 탈퇴하시겠어요?</span>
              <ImageBox size="modalImage" src={Sample} alt="강아지와 고양이가 울먹거리는 이미지" />
              <span className={styles.modalText}>
                • 찜한 상품 6개와 장바구니에 담은 상품 2개가 모두 사라져요
                <br />• 우리 아이와의 추억이 담긴 리뷰 3개가 모두 사라져요
              </span>
              <div className={styles.modalButtonArea}>
                <Button size="medium" backgroundColor="$color-white">
                  탈퇴하기
                </Button>
                <Button size="medium" backgroundColor="$color-gray-800" onClick={handleModalClose}>
                  돌아가기
                </Button>
              </div>
            </div>
          </BottomShareModal>
        )}
      </div>
    </div>
  );
}
