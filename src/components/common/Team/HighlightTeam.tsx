import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TeamDataCard from './TeamDataCard';
import { httpClient } from '@/apis/httpClient';
import styles from './HighlightTeam.module.scss';

interface GroupUser {
  nickname: string;
}

interface GroupBuyingData {
  id: number;
  status: number;
  groupUsers: GroupUser[];
}

export default function HighlightTeam({ productId }: any) {
  const router = useRouter();

  const [teamData, setTeamData] = useState<GroupBuyingData[]>([]);

  useEffect(() => {
    const fetchGroupBuyingData = async () => {
      try {
        const response = await httpClient().get<GroupBuyingData[]>(`group-buying/${productId}`);
        console.log(response.slice(0, 3));
        setTeamData(response.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroupBuyingData();
  }, []);

  const handleAllTeamPageLick = () => {
    router.push({
      pathname: `/team`,
      query: {
        productId: productId,
      },
    });
  };

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
          <button className={styles.allTeamLinkBtn} onClick={handleAllTeamPageLick}>
            참여자 전체보기
          </button>
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
