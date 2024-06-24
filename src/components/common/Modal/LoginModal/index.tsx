import classNames from 'classnames/bind';
import BottomModal from '../Base/BottomModal';
import styles from './LoginModal.module.scss';
import Button from '@/components/common/Button';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

interface LoginModal {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModal) {
  const router = useRouter();
  const handleLoginButtonClick = () => {
    router.replace({ pathname: '/my', query: { prevPath: router.asPath } });
  };

  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <div className={cx('modalContents')}>
        <p className={cx('modalTitle')}>
          로그인이 필요합니다.
          <br />
          로그인 페이지로 이동하시겠습니까?
        </p>
        <div className={cx('modalButtons')}>
          <Button size="medium" backgroundColor="$color-white" onClick={onClose}>
            취소
          </Button>
          <Button size="medium" backgroundColor="$color-gray-800" onClick={handleLoginButtonClick}>
            확인
          </Button>
        </div>
      </div>
    </BottomModal>
  );
}
