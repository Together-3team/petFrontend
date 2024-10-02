import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';

import TeamDataCard from './TeamDataCard';
import { httpClient } from '@/apis/httpClient';
import { GroupBuyingData } from '@/types/apis/groupBuying';
import useAuth from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
import LoginModal from '../Modal/LoginModal';
import OptionBottomSheet from '@/components/product/OptionBottomSheet';
import { Product } from '@/types/product';
import { ToastParameters } from '@/types/components/toast';
import styles from './HighlightTeam.module.scss';

interface HighlightTeamProps {
  product: Product;
  showToast: (toast: ToastParameters) => void;
}

export default function HighlightTeam({ product, showToast }: HighlightTeamProps) {
  const [teamData, setTeamData] = useState<GroupBuyingData[]>([]);
  const [hasManyTeams, setHasManyTeams] = useState(false);
  const { isLogin } = useAuth();
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const {
    modalOpen: secondModalOpen,
    handleModalOpen: handleSecondModalOpen,
    handleModalClose: handleSecondModalClose,
  } = useModal();
  // const {
  //   modalOpen: thirdModalOpen,
  //   handleModalOpen: handleThirdModalOpen,
  //   handleModalClose: handleThirdModalClose,
  // } = useModal();
  const router = useRouter();
  const socket = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);

  const handleShowAll = () => {
    router.replace(`/products/${product.id}/team`);
  };

  useEffect(() => {
    const fetchGroupBuyingData = async () => {
      try {
        const response = await httpClient().get<GroupBuyingData[]>(`group-buying/${product.id}`);
        setTeamData(response.slice(0, 3));

        if (response.length > 3) {
          setHasManyTeams(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroupBuyingData();

    // 소켓 이벤트 처리
    socket.emit('subscribeToProduct', product.id);
    socket.on('productUpdate', update => {
      console.log(update);
      fetchGroupBuyingData();
    });

    return () => {
      socket.emit('unsubscribeFromProduct', product.id);
      socket.off('productUpdate');
    };
  }, [product.id]);

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
              <TeamDataCard key={data.id} data={data} product={product} />
            ))}
          </div>
          {hasManyTeams && (
            <button type="button" className={styles.allTeamLinkBtn} onClick={handleShowAll}>
              참여자 전체보기
            </button>
          )}
        </>
      ) : (
        <div className={styles.noTeamBox}>
          <p className={styles.noTeamText}>아직 생성된 공동구매가 없어요</p>
          <button
            type="button"
            className={styles.participationBtn}
            onClick={isLogin ? handleSecondModalOpen : handleModalOpen}>
            내가 먼저 주문하기
          </button>
        </div>
      )}
      <LoginModal isOpen={modalOpen} onClose={handleModalClose} />
      <OptionBottomSheet
        isOpen={secondModalOpen}
        onClose={handleSecondModalClose}
        product={product}
        type="cartPurchase"
        showToast={showToast}
      />
    </section>
  );
}
