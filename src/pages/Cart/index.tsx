import styles from './Cart.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
  return (
    <>
      <div className={styles.cart}>
        <div className={styles.totalCheckbox}>
          <input type="checkbox" name="totalCheck" />
          <div className={styles.totalNumber}>전체 n개</div>
        </div>
        <div className={styles.oneCheckbox}>
          <div className={styles.productBoxTop}>
            <input type="checkbox" name="oneCheckbox" />
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <div className={styles.productExplain}>
            <Image
              className={styles.productImg}
              width={56}
              height={56}
              src="/images/exampleProductImg.jpg"
              alt="productImg"
            />
            <div>
              <div className={styles.productTitle}>강아지 간식 27종</div>
              <div className={styles.option}>강아지 독 리얼큐브 소고기 300g</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
