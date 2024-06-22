import AmpersandIcon from '@/assets/svgs/ampersand-icon.svg';
import styles from './TeamDataCard.module.scss';

export default function TeamDataCard({ data, onClick }: any) {
  return (
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
            <button className={styles.participationBtn} onClick={onClick}>
              주문참여
            </button>
          </div>
        </>
      )}
    </div>
  );
}
