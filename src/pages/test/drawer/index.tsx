import Image from 'next/image';
import classNames from 'classnames/bind';

import useModal from '@/hooks/useModal';
import Input from '@/components/common/Input';
import AdaptiveModal from '@/components/common/Modal/AdaptiveModal';
import Button from '@/components/common/Button';
import titleImage from '@/assets/images/rectangle.png';
import styles from './Drawer.module.scss';

const cx = classNames.bind(styles);

export default function DrawerPage() {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <div className={cx('my')}>
      <Input id="이메일" type="email" label="이메일" size={'large'} background={'background'} placeholder=" " />
      <Input id="이름" type="text" label="이름" size={'large'} background={'background'} placeholder=" " />
      <div onClick={handleModalOpen}>모달 열기</div>
      <AdaptiveModal
        type="drawer"
        className={cx('')}
        modalOpen={modalOpen}
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}>
        <Image
          src={titleImage}
          alt={'대표이미지'}
          width={100}
          height={100}
          blurDataURL={'@/assets/svgs/rectangle.svg'}
          placeholder="blur"
        />
        <div className={cx('title')}>
          <span>집사 친구와 함께 더 저렴하게 구매하세요!</span>
        </div>
      </AdaptiveModal>
    </div>
  );
}
