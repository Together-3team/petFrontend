import AmpersandIcon from '@/assets/svgs/ampersand-icon.svg';
import useModal from '@/hooks/useModal';
import OptionBottomSheet from '@/components/product/OptionBottomSheet';
import useToast from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import LoginModal from '../Modal/LoginModal';
import styles from './TeamDataCard.module.scss';

export default function TeamDataCard({ data, product, onClick }: any) {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const { showToast } = useToast();
  const { isLogin } = useAuth();
  const {
    modalOpen: secondModalOpen,
    handleModalOpen: handleSecondModalOpen,
    handleModalClose: handleSecondModalClose,
  } = useModal();
  return (
    <>
      <div className={styles.teamData}>
        {data.status === 1 ? (
          <>
            <div className={styles.participants}>
              {data.userGroup[0].nickname}
              <div>
                <AmpersandIcon />
              </div>
              {data.userGroup[1].nickname}
            </div>
            <p className={styles.orderComplete}>주문완료</p>
          </>
        ) : (
          <>
            <p className={styles.creator}>{data.userGroup[0].nickname}</p>
            <div className={styles.timeAndBtn}>
              {/* <div className={styles.timeBox}>
              <p className={styles.closed}>참여 마감</p>
              <p className={styles.timer}>23:12:21</p>
            </div> */}
              <button
                type="button"
                className={styles.participationBtn}
                onClick={() => {
                  if (!isLogin) {
                    handleSecondModalOpen();
                    return;
                  }
                  onClick && onClick();
                  handleModalOpen && handleModalOpen();
                }}>
                주문참여
              </button>
            </div>
          </>
        )}
        {!onClick && (
          <OptionBottomSheet
            isOpen={modalOpen}
            onClose={handleModalClose}
            product={product}
            type="purchaseOnly"
            showToast={showToast}
            groupBuyingId={data.id}
          />
        )}
      </div>
      <LoginModal onClose={handleSecondModalClose} isOpen={secondModalOpen} />
    </>
  );
}
