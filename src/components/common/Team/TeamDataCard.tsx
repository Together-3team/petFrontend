import AmpersandIcon from '@/assets/svgs/ampersand-icon.svg';
import styles from './TeamDataCard.module.scss';

export default function TeamDataCard({ data }: any) {
  return (
    <div className={styles.teamData}>
      {data.status === '완료' ? (
        <>
          <div className={styles.participants}>
            {data.participants[0].name}
            <div>
              <AmpersandIcon />
            </div>
            {data.participants[1].name}
          </div>
          <p className={styles.orderComplete}>주문완료</p>
        </>
      ) : (
        <>
          <p className={styles.creator}>{data.creator}</p>
          <div className={styles.timeAndBtn}>
            <div className={styles.timeBox}>
              <p className={styles.closed}>참여 마감</p>
              <p className={styles.timer}>23:12:21</p>
            </div>
            <button className={styles.participationBtn}>주문참여</button>
          </div>
        </>
      )}
    </div>
  );
}
