import { useState, useEffect } from 'react';
import styles from './PaymentAgree.module.scss';
import Button from '../common/Button';
import { faL } from '@fortawesome/free-solid-svg-icons';

interface PaymentAgreeProps {
  onCheckboxChange: (checked: boolean) => void;
}

export default function PaymentAgree({ onCheckboxChange }: PaymentAgreeProps) {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [check1Checked, setCheck1Checked] = useState(false);
  const [check2Checked, setCheck2Checked] = useState(false);

  useEffect(() => {
    if (check1Checked && check2Checked) {
      setCheckboxChecked(true);
      onCheckboxChange(true);
    } else {
      setCheckboxChecked(false);
      onCheckboxChange(false);
    }
  }, [check1Checked, check2Checked, onCheckboxChange]);

  function handleCheckboxChange() {
    const newChecked = !checkboxChecked;
    setCheckboxChecked(newChecked);
    setCheck1Checked(newChecked);
    setCheck2Checked(newChecked);
  }

  function handleCheck1Change() {
    setCheck1Checked(!check1Checked);
  }

  function handleCheck2Change() {
    setCheck2Checked(!check2Checked);
  }

  return (
    <>
      <div className={styles.agree}>
        <div className={styles.checkboxTitle}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={checkboxChecked}
            onChange={handleCheckboxChange}
          />
          <div className={styles.agreeTitle}>주문내용 확인 및 결제 동의</div>
        </div>
        <div className={styles.contentCheckbox}>
          <input type="checkbox" className={styles.check} checked={check1Checked} onChange={handleCheck1Change} />
          <div className={styles.checkContent}>(필수) 개인정보 수집, 이용 동의</div>
        </div>
        <div className={styles.contentCheckbox}>
          <input type="checkbox" className={styles.check} checked={check2Checked} onChange={handleCheck2Change} />
          <div className={styles.checkContent}>(필수) 개인정보 제3자 정보 제공 동의</div>
        </div>
      </div>
    </>
  );
}
