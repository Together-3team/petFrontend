import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import styles from './WritePage.module.scss';
import Image from 'next/image';
import testImage from '@/assets/images/rectangle.png';
import StarRating from '@/components/common/review/StarRating';
import Textarea from '@/components/common/review/Textarea';
import Button from '@/components/common/Button';

export default function WritePage() {
  return (
    <div>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <Header.Center className={styles.pageTitle}>리뷰 작성</Header.Center>
        </Header.Box>
      </Header.Root>
      <div>
        <div>
          <Image src={testImage} alt="상품 이미지" />
          <div>
            <p>호랑이 간식 27종</p>
            <p>호랑이 독 리얼큐브 소고기 300g | 1개</p>
          </div>
        </div>
        <div>
          <p>전반적으로 어떠셨나요?</p>
          <StarRating editable rating={5} />
        </div>
        <div>
          <p>구체적으로 어떤 점이 좋았는지, 또는 어떤 점이 아쉬웠는지 작성해 주세요.</p>
          <Textarea />
        </div>
        <Button size={'large'} backgroundColor={'$color-pink-main'}>
          저장
        </Button>
      </div>
    </div>
  );
}
