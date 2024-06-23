import { useEffect, useState } from 'react';
import Link from 'next/link';
import { io } from 'socket.io-client';
import TeamDataCard from './TeamDataCard';
import { httpClient } from '@/apis/httpClient';
import { GroupBuyingData } from '@/types/apis/groupBuying';
import styles from './HighlightTeam.module.scss';

interface HighlightTeamProps {
  productId: number;
}

export default function HighlightTeam({ productId }: HighlightTeamProps) {
  const [teamData, setTeamData] = useState<GroupBuyingData[]>([]);

  const socket = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);

  useEffect(() => {
    const fetchGroupBuyingData = async () => {
      try {
        const response = await httpClient().get<GroupBuyingData[]>(`group-buying/${productId}`);
        setTeamData(response.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroupBuyingData();

    // 소켓 이벤트 처리
    socket.emit('subscribeToProduct', productId);
    socket.on('productUpdate', update => {
      console.log(update);
      fetchGroupBuyingData();
    });

    return () => {
      socket.emit('unsubscribeFromProduct', productId);
      socket.off('productUpdate');
    };
  }, [productId]);

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
          <Link className={styles.allTeamLinkBtn} href={`${productId}/team`}>
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
