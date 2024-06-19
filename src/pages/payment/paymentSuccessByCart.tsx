import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './PaymentSuccessByCart.module.scss';
import paymentSuccess from '@/assets/images/paymentSuccess.png';
import Image from 'next/image';
import { completePayment } from '@/apis/paymentApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function PaymentSuccessByCart() {
  const [buttonText, setButtonText] = useState('링크 복사하기');
  const [buttonColor, setButtonColor] = useState(styles.copyButton);
  const router = useRouter();

  function handleCopyLink() {
    const dummyLink = 'https://example.com/seoleeping';
    navigator.clipboard
      .writeText(dummyLink)
      .then(() => {
        setButtonText('링크 복사완료!');
        setButtonColor(styles.copyButtonSuccess);
        setTimeout(() => {
          setButtonText('다시 복사하기');
          setButtonColor(styles.copyButton);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }

  return (
    <>
      <FontAwesomeIcon icon={faXmark} className={styles.faXmark} onClick={() => router.push('/')} />
      <div className={styles.paymentSuccessByCart}>
        <div className={styles.warning}>
          24시간 내 성사되지 않으면
          <br />
          주문이 취소될 수 있어요!
        </div>
        <Image className={styles.petImg} width={180} height={180} src={paymentSuccess} alt="petImg" />
        <div className={styles.share}>
          <div className={styles.shareMent}>공유하고 친구와 같이 할인받기</div>
          <button className={buttonColor} onClick={handleCopyLink}>
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
}
