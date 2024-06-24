import { ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import { useFormContext, useWatch } from 'react-hook-form';
import classNames from 'classnames/bind';
import { FormValues } from '.';
import CheckOnly from '@/components/common/CheckOnly';
import styles from './UserAgreement.module.scss';

const cx = classNames.bind(styles);

export default function UserAgreement() {
  const { reset, control } = useFormContext<FormValues>();

  const values = useWatch({ control });
  const { serviceAgreement, privatePolicy, isSubscribedToPromotions } = values;

  function handleSelectAll(e: ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;
    reset(
      prevFormState => ({
        ...prevFormState,
        serviceAgreement: isChecked,
        privatePolicy: isChecked,
        isSubscribedToPromotions: isChecked,
      }),
      { keepDefaultValues: true, keepErrors: true }
    );
  }

  return (
    <div className={cx('userAgreement')}>
      <span className={cx('agreementTitle')}>이용약관</span>
      <label className={cx('allAgreement')}>
        <input
          type="checkbox"
          className={cx('checkBox')}
          onChange={handleSelectAll}
          checked={serviceAgreement && privatePolicy && isSubscribedToPromotions}
        />
        <span className={cx('allAgreementText')}>전체 동의</span>
      </label>
      <div>
        <div className={cx('agreementBox')}>
          <div className={cx('agreement')}>
            <CheckOnly name={'serviceAgreement'} />
            <span className={cx('inputCenter')}>(필수) 서비스 이용약관 동의</span>
            <Link
              className={cx('detail')}
              href="https://vast-nephew-587.notion.site/554194d084c64caaba2c165f4b803708?pvs=4">
              자세히
            </Link>
          </div>
          <div className={cx('agreement')}>
            <CheckOnly name={'privatePolicy'} />
            <span className={cx('inputCenter')}>(필수) 개인정보 수집 및 이용 동의</span>
            <Link
              className={cx('detail')}
              href="https://vast-nephew-587.notion.site/367187c8edb6468d8cbc197c688cb4eb?pvs=4">
              자세히
            </Link>
          </div>
          <div className={cx('agreement')}>
            <CheckOnly name={'isSubscribedToPromotions'} />
            <span className={cx('inputCenter')}>(선택) 광고성 정보 수신 전체 동의</span>
            <Link
              className={cx('detail')}
              href="https://vast-nephew-587.notion.site/25d52ac8eaac43df93fdedfbeeec442f?pvs=4">
              자세히
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
