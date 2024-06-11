import { useState } from 'react';
import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import RatingBox from '@/components/common/review/RatingBox';
import ReviewBox from '@/components/common/review/ReviewBox';
import styles from './ReviewPage.module.scss';

export default function ReviewPage() {
  const testData = [
    {
      id: 1,
      nickname: '서리핑1',
      option: '소고기맛/선물포장',
      quantity: 3,
      rating: 4,
      description:
        '설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-05-24T14:35:22.000Z',
    },
    {
      id: 2,
      nickname: '서리핑2',
      option: '닭고기맛/선물포장',
      quantity: 5,
      rating: 1,
      description:
        '설이는 정말 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-05-24T14:35:22.000Z',
    },
    {
      id: 3,
      nickname: '서리핑3',
      option: '소고기맛',
      quantity: 2,
      rating: 3,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-05-24T14:35:22.000Z',
    },
    {
      id: 4,
      nickname: '서리핑4',
      option: '소고기맛',
      quantity: 2,
      rating: 1,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-05-24T14:35:22.000Z',
    },
    {
      id: 5,
      nickname: '서리핑5',
      option: '소고기맛',
      quantity: 2,
      rating: 2,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-02-23T14:35:22.000Z',
    },
    {
      id: 6,
      nickname: '서리핑6',
      option: '소고기맛',
      quantity: 2,
      rating: 2,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-02-24T14:35:22.000Z',
    },
    {
      id: 7,
      nickname: '서리핑7',
      option: '소고기맛',
      quantity: 2,
      rating: 5,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2023-05-24T14:35:22.000Z',
    },
    {
      id: 8,
      nickname: '서리핑8',
      option: '소고기맛',
      quantity: 2,
      rating: 3,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-03-24T14:35:22.000Z',
    },
    {
      id: 9,
      nickname: '서리핑9',
      option: '소고기맛',
      quantity: 2,
      rating: 1,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-05-21T14:35:22.000Z',
    },
    {
      id: 10,
      nickname: '서리핑10',
      option: '소고기맛',
      quantity: 2,
      rating: 4,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-01-24T14:35:22.000Z',
    },
  ];

  const rating = 4.5;
  const totalReviewer = 180;

  const [sortOption, setSortOption] = useState('최신순');
  const [sortedData, setSortedData] = useState([...testData]);

  const sortData = (option: string) => {
    let sorted: any[] = [];
    if (option === '최신순') {
      sorted = [...testData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (option === '별점 높은 순') {
      sorted = [...testData].sort((a, b) => b.rating - a.rating);
    } else if (option === '별점 낮은 순') {
      sorted = [...testData].sort((a, b) => a.rating - b.rating);
    }
    setSortedData(sorted);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSortOption(option);
    sortData(option);
  };

  return (
    <div className={styles.reviewPageLayout}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <Header.Center className={styles.pageTitle}>
            리뷰 전체보기 <span className={styles.totalReview}>{totalReviewer}</span>
          </Header.Center>
        </Header.Box>
      </Header.Root>
      <div>
        <RatingBox rating={rating} totalReviewer={totalReviewer} className={styles.ratingBoxStyle} />
        <div className={styles.dropdown}>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="최신순">최신순</option>
            <option value="별점 높은 순">별점 높은 순</option>
            <option value="별점 낮은 순">별점 낮은 순</option>
          </select>
        </div>
      </div>
      <div className={styles.reviewContainer}>
        {sortedData.map(data => (
          <ReviewBox key={data.id} reviewData={data} className={styles.reviewBoxStyle} />
        ))}
      </div>
    </div>
  );
}
