import { useEffect, useState } from 'react';
import Link from 'next/link';
import TeamDataCard from './TeamDataCard';
import { httpClient } from '@/apis/httpClient';
import styles from './HighlightTeam.module.scss';

export default function HighlightTeam({ productId }: any) {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchGroupBuyingData = async () => {
      try {
        const response = await httpClient().get(`group-buying/${productId}`);
        console.log(response.slice(0, 3));
        setTeamData(response.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroupBuyingData();
  }, []);

  return (
    <section className={styles.highlightTeamLayout}>
      <div className={styles.sectionTitleBox}>
        <p className={styles.title}>2인 공동구매</p>
        <p className={styles.description}>주문참여로 기다림 없이 바로 주문해보세요</p>
      </div>
      {teamData.length > 0 ? (
        <>
          <div className={styles.teamBox}>
            {teamData.map(data => (
              <TeamDataCard key={data.id} data={data} />
            ))}
          </div>
          <Link href="/test/team" className={styles.allTeamLinkBtn}>
            참여자 전체보기
          </Link>
        </>
      ) : (
        <div className={styles.noTeamBox}>
          <p className={styles.noTeamText}>아직 생성된 공동구매가 없어요</p>
          <button className={styles.participationBtn}>내가 먼저 주문하기</button>
        </div>
      )}
    </section>
  );
}
