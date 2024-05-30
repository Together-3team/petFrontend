import classNames from 'classnames/bind';
import styles from './UserAgreement.module.scss';

const cx = classNames.bind(styles);

export default function UserAgreement() {
  return (
    <div className={cx('userAgreement')}>
      <span className={cx('agreementTitle')}>이용약관</span>
      <div className={cx('allAgreement')}>
        <input type="checkbox" className={cx('checkBox')} />
        <span className={cx('allAgreementText')}>전체 동의</span>
      </div>
      <div>
        <div className={cx('agreementBox')}>
          <div className={cx('agreement')}>
            <input type="checkbox" className={cx('check')} />
            <span className={cx('inputCenter')}>(필수) 서비스 이용약관 동의</span>
            <div className={cx('detail')}>자세히</div>
          </div>
          <div className={cx('agreement')}>
            <input type="checkbox" className={cx('check')} />
            <span className={cx('inputCenter')}>(필수) 개인정보 수집 및 이용 동의</span>
            <div className={cx('detail')}>자세히</div>
          </div>
          <div className={cx('agreement')}>
            <input type="checkbox" className={cx('check')} />
            <span className={cx('inputCenter')}>(선택) 광고성 정보 수신 전체 동의</span>
            <div className={cx('detail')}>자세히</div>
          </div>
        </div>
      </div>
    </div>
  );
}
