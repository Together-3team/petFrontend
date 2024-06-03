import Link from 'next/link';
import ImageBox from '@/components/common/ImageBox';
import Button from '@/components/common/Button';
import styles from './Onboarding.module.scss';

export default function Onboarding() {
  return (
    <div>
      <span>
        어서오세요!
        <br />
        어떤 반려동물과 함께하시나요?
      </span>
      <div>
        <div>
          <ImageBox size="petPhoto" src="" alt="강아지 이미지" />
          <button>
            <span>강아지</span>
          </button>
        </div>
        <div>
          <ImageBox size="petPhoto" src="" alt="고양이 이미지" />
          <button>고양이</button>
        </div>
      </div>
      <Button size="mediumLarge" backgroundColor="$color-pink-main">
        다음
      </Button>
      <Link href="/">
        <div className={styles.laterChoose}>나중에 선택할게요</div>
      </Link>
    </div>
  );
}
