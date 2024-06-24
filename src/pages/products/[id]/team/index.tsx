import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';

import Header from '@/components/common/Layout/Header';
import TeamDataCard from '@/components/common/Team/TeamDataCard';
import { httpClient } from '@/apis/httpClient';
import { GroupBuyingData } from '@/types/apis/groupBuying';
import useAuth from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
import LoginModal from '@/components/common/Modal/LoginModal';
import LeftArrow from '@/assets/svgs/left-arrow.svg';
import styles from './TeamPage.module.scss';

const cx = classNames.bind(styles);

export default function TeamPage() {
  const router = useRouter();
  const productId = router.query.id;
  const { isLogin } = useAuth();

  const [teamData, setTeamData] = useState<GroupBuyingData[]>([]);
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();

  const socket = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);

  const handleJoinButtonClick = (index: number) => {
    if (!isLogin) {
      handleModalOpen();
      return;
    }
    router.push(
      { pathname: `/products/${productId}`, query: { open: 'true', groupid: teamData[index].id } },
      `/products/${productId}`
    );
  };

  const handleBackButtonClick = () => {
    router.replace(`/products/${productId}`);
  };

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
              <button className={cx('backButton')} onClick={handleBackButtonClick}>
                <LeftArrow width={24} height={24} alt="뒤로 가기 버튼" />
              </button>
            </Header.Left>
            <Header.Center className={styles.pageTitle}>참여자 전체보기</Header.Center>
          </Header.Box>
        </Header.Root>
        <div>
          {teamData.map((data, index) => (
            <TeamDataCard key={data.id} data={data} onClick={() => handleJoinButtonClick(index)} />
          ))}
        </div>
      </div>
      <LoginModal isOpen={modalOpen} onClose={handleModalClose} />
    </>
  );
}
