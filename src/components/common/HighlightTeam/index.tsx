import Link from 'next/link';
import styles from './HighlightTeam.module.scss';

export default function HighlightTeam() {
  const testData = [
    {
      id: 1,
      status: '진행중',
      creator: '해피사랑',
      createdAt: '2024-06-01T10:00:00Z',
      participants: [{ name: '해피사랑', joinedAt: '2024-06-01T10:00:00Z' }],
    },
    {
      id: 2,
      status: '완료',
      creator: '뽀수니',
      createdAt: '2024-05-20T14:30:00Z',
      participants: [
        { name: '뽀수니', joinedAt: '2024-05-20T14:30:00Z' },
        { name: '춘배', joinedAt: '2024-05-22T09:45:00Z' },
      ],
    },
    {
      id: 3,
      status: '진행중',
      creator: '서리핑',
      createdAt: '2024-06-03T08:15:00Z',
      participants: [{ name: '서리핑', joinedAt: '2024-06-03T08:15:00Z' }],
    },
    {
      id: 4,
      status: '완료',
      creator: '탱고',
      createdAt: '2024-05-15T11:20:00Z',
      participants: [
        { name: '탱고', joinedAt: '2024-05-15T11:20:00Z' },
        { name: '탱자', joinedAt: '2024-05-18T13:35:00Z' },
      ],
    },
    {
      id: 5,
      status: '진행중',
      creator: '밍아달려',
      createdAt: '2024-06-04T16:45:00Z',
      participants: [{ name: '밍아달려', joinedAt: '2024-06-04T16:45:00Z' }],
    },
  ];

  return (
    <section className={styles.highlightTeamLayout}>
      <div className={styles.sectionTitleBox}>
        <p className={styles.title}>2인 공동구매</p>
        <p className={styles.description}>주문참여로 기다림 없이 바로 주문해보세요</p>
      </div>
      <div className={styles.teamBox}>공동구매 data</div>
      <Link href={'/test/team'} className={styles.allTeamLinkBtn}>
        참여자 전체보기
      </Link>
    </section>
  );
}
