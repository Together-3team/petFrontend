import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import classNames from 'classnames/bind';

import styles from './Review.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

export default function Review() {
  const [reviewWrite, setReviewWrite] = useState(true);
  const [myReview, setMyReview] = useState(false);

  function handleClickWrite() {
    setReviewWrite(true);
    setMyReview(false);
  }

  function handleClickMyReview() {
    setMyReview(true);
    setReviewWrite(false);
  }

  return (
    <div className={styles.reviewLayout}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <h1>내 리뷰</h1>
        </Header.Box>
      </Header.Root>
      <div className={styles.reviewSelector}>
        <button className={cx('reviewSelectButton', { clickButton: reviewWrite })} onClick={handleClickWrite}>
          리뷰 쓰기
        </button>
        <button className={cx('reviewSelectButton', { clickButton: myReview })} onClick={handleClickMyReview}>
          내가 쓴 리뷰
        </button>
      </div>
    </div>
  );
}
