import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import TeamDataCard from '@/components/common/Team/TeamDataCard';
import styles from './TeamPage.module.scss';
import useModal from '@/hooks/useModal';
import OptionBottomSheet from '@/components/product/OptionBottomSheet';
import { useEffect, useState } from 'react';
import { httpClient } from '@/apis/httpClient';
import { useRouter } from 'next/router';

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
  const { productId } = router.query;

  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const [teamData, setTeamData] = useState<GroupBuyingData[]>([]);

  useEffect(() => {
    const fetchGroupBuyingData = async () => {
      try {
        const response = await httpClient().get<GroupBuyingData[]>(`group-buying/${productId}`);
        console.log(response);
        setTeamData(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroupBuyingData();
  }, []);

  console.log(productId);

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
