import AmpersandIcon from '@/assets/svgs/ampersand-icon.svg';
import styles from './TeamDataCard.module.scss';
import { httpClient } from '@/apis/httpClient';

export default function TeamDataCard({ data, onClick }: any) {
  // const handleShowBottomSheet = async () => {
  //   try {
  //     const response = await httpClient().get('products/detail/1');
  //     console.log(response.options);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
            <button className={styles.participationBtn} onClick={onClick}>
              주문참여
            </button>
          </div>
        </>
      )}
    </div>
  );
}
