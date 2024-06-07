import Link from 'next/link';
import AmpersandIcon from '@/assets/svgs/ampersand-icon.svg';
import styles from './HighlightTeam.module.scss';

export default function HighlightTeam() {
  // 타이머, 웹소켓, 주문버튼 연결

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
      status: '완료',
      creator: '탱고',
      createdAt: '2024-05-15T11:20:00Z',
      participants: [
        { name: '탱고', joinedAt: '2024-05-15T11:20:00Z' },
        { name: '탱자', joinedAt: '2024-05-18T13:35:00Z' },
      ],
    },
  ];

  return (
    <section className={styles.highlightTeamLayout}>
      <div className={styles.sectionTitleBox}>
        <p className={styles.title}>2인 공동구매</p>
        <p className={styles.description}>주문참여로 기다림 없이 바로 주문해보세요</p>
      </div>
      {testData.length > 0 ? (
        <>
          <div className={styles.teamBox}>
            {testData.map(data => (
              <div key={data.id} className={styles.teamData}>
                {data.status === '완료' ? (
                  <>
                    <div className={styles.participants}>
                      {data.participants[0].name}
                      <div>
                        <AmpersandIcon />
                      </div>
                      {data.participants[1].name}
                    </div>
                    <p className={styles.realClosed}>주문완료</p>
                  </>
                ) : (
                  <>
                    <p className={styles.nickname}>{data.creator}</p>
                    <div className={styles.timeAndBtn}>
                      <div className={styles.timeBox}>
                        <p className={styles.closed}>참여 마감</p>
                        <p className={styles.time}>23:12:21</p>
                      </div>
                      <button className={styles.participationBtn}>주문참여</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <Link href={'/test/team'} className={styles.allTeamLinkBtn}>
            참여자 전체보기
          </Link>
        </>
      ) : (
        <div className={styles.noTeamBox}>
          <p className={styles.noTeamText}>아직 생성된 공동구매가 없어요</p>
          <button className={styles.buyBtn}>내가 먼저 주문하기</button>
        </div>
      )}
    </section>
  );
}
