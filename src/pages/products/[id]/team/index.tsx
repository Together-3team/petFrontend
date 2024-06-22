import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import TeamDataCard from '@/components/common/Team/TeamDataCard';
import useModal from '@/hooks/useModal';
import OptionBottomSheet from '@/components/product/OptionBottomSheet';
import { httpClient } from '@/apis/httpClient';
import styles from './TeamPage.module.scss';

interface GroupUser {
  nickname: string;
}

interface GroupBuyingData {
  id: number;
  status: number;
  groupUsers: GroupUser[];
}

export default function TeamPage() {
  const router = useRouter();
  const productId = router.query.id;

  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const [teamData, setTeamData] = useState<GroupBuyingData[]>([]);

  const socket = io('http://ec2-13-209-80-36.ap-northeast-2.compute.amazonaws.com/');

  useEffect(() => {
    const fetchGroupBuyingData = async () => {
      try {
        const response = await httpClient().get<GroupBuyingData[]>(`group-buying/${productId}`);
        setTeamData(response);
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
    <>
      <div className={styles.teamPageLayout}>
        <Header.Root>
          <Header.Box>
            <Header.Left>
              <BackButton />
            </Header.Left>
            <Header.Center className={styles.pageTitle}>페이지 전체보기</Header.Center>
          </Header.Box>
        </Header.Root>
        <div>
          {teamData.map(data => (
            <TeamDataCard key={data.id} data={data} onClick={handleModalOpen} />
          ))}
        </div>
      </div>
      <OptionBottomSheet isOpen={modalOpen} onClose={handleModalClose} />
    </>
  );
}
