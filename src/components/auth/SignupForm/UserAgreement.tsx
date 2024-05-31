import { forwardRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './UserAgreement.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';

interface UserAgreementProps {
  id: string;
  service: UseFormRegisterReturn<'serviceAgreement'>;
  privatePolicy: UseFormRegisterReturn<'privatePolicy'>;
  marketing: UseFormRegisterReturn<'marketingAgreement'>;
}

const cx = classNames.bind(styles);
const type = 'checkbox';
const UserAgreement = forwardRef<HTMLInputElement, UserAgreementProps>(function UserAgreement(
  { id, service, privatePolicy, marketing },
  ref
) {
  return (
    <div className={cx('userAgreement')}>
      <span className={cx('agreementTitle')}>이용약관</span>
      <div className={cx('allAgreement')}>
        <input ref={ref} id={`${id}-all`} type={type} className={cx('checkBox')} value={'all'} />
        <span className={cx('allAgreementText')}>전체 동의</span>
      </div>
      <div>
        <div className={cx('agreementBox')}>
          <div className={cx('agreement')}>
            <input id={`${id}-1`} type={type} className={cx('check')} {...service} />
            <span className={cx('inputCenter')}>(필수) 서비스 이용약관 동의</span>
            <Link
              className={cx('detail')}
              href="https://vast-nephew-587.notion.site/554194d084c64caaba2c165f4b803708?pvs=4">
              자세히
            </Link>
          </div>
          <div className={cx('agreement')}>
            <input id={`${id}-2`} type={type} className={cx('check')} {...privatePolicy} />
            <span className={cx('inputCenter')}>(필수) 개인정보 수집 및 이용 동의</span>
            <Link
              className={cx('detail')}
              href="https://vast-nephew-587.notion.site/367187c8edb6468d8cbc197c688cb4eb?pvs=4">
              자세히
            </Link>
          </div>
          <div className={cx('agreement')}>
            <input id={`${id}-3`} type={type} className={cx('check')} {...marketing} />
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
});

export default UserAgreement;
