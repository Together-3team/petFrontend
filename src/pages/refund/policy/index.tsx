import classNames from 'classnames/bind';
import { useRouter } from 'next/router';

import Header from '@/components/common/Layout/Header';
import LeftArrow from '@/assets/svgs/left-arrow.svg';
import styles from './Policy.module.scss';

const cx = classNames.bind(styles);

export default function RefundPolicy() {
  const router = useRouter();
  const { productId } = router.query;

  const handleBackButtonClick = () => {
    router.replace(`/products/${productId}`);
  };

  return (
    <>
      <Header.Root className={cx('headerRoot')}>
        <Header.Box>
          <Header.Left>
            <button className={cx('backButton')} onClick={handleBackButtonClick}>
              <LeftArrow width={24} height={24} alt="뒤로 가기 버튼" />
            </button>
          </Header.Left>
          <div className={cx('title')}>
            <Header.Center>주문 취소/교환/반품 안내</Header.Center>
          </div>
        </Header.Box>
      </Header.Root>
      <div className={cx('container')}>
        <div className={cx('section')}>
          <div className={cx('sectionHeader')}>주문 취소 안내</div>
          <ul className={cx('list')}>
            <li className={cx('listItem')}>
              <span className={cx('listItem')}>주문 취소 가능 시간:</span>{' '}
              <span className={cx('listItemContent')}>결제 완료 후 24시간 이내</span>
            </li>
            <li className={cx('listItem')}>
              <span className={cx('listItem')}>취소 방법:</span>{' '}
              <span className={cx('listItemContent')}>고객센터(연락처) 또는 내 주문내역에서 직접 취소 가능</span>
            </li>
            <li className={cx('listItem')}>
              <span className={cx('listItem')}>유의 사항:</span>{' '}
              <span className={cx('listItemContent')}>
                이미 발송된 상품은 취소가 불가능하며, 반품 절차를 따라야 합니다.
              </span>
            </li>
          </ul>
        </div>

        <div className={cx('section')}>
          <div className={cx('sectionHeader')}>교환 안내</div>
          <ul className={cx('list')}>
            <li className={cx('listItem')}>
              <span className={cx('listItem')}>교환 신청 기간:</span>{' '}
              <span className={cx('listItemContent')}>상품 수령 후 7일 이내</span>
            </li>
            <li className={cx('listItem')}>
              <span className={cx('listItem')}>교환 가능 사유:</span>
              <ul className={cx('list')}>
                <li className={cx('listItemContent')}>상품 불량 또는 오배송</li>
                <li className={cx('listItemContent')}>사이즈, 색상 등 상품 옵션 변경</li>
              </ul>
            </li>
            <li className={cx('listItem')}>
              <span className={cx('listItem')}>교환 절차:</span>
              <ul className={cx('list')}>
                <li className={cx('listItemContent')}>
                  <span className={cx('sectionNumber')}>1.</span> 고객센터(연락처)로 교환 요청
                </li>
                <li className={cx('listItemContent')}>
                  <span className={cx('sectionNumber')}>2.</span> 교환 요청 승인 후, 지정된 택배사를 통해 상품 발송
                </li>
                <li className={cx('listItemContent')}>
                  <span className={cx('sectionNumber')}>3.</span> 새 상품 발송
                </li>
              </ul>
            </li>
            <li className={cx('listItem')}>
              <span className={cx('listItem')}>유의 사항:</span>
              <ul className={cx('list')}>
                <li className={cx('listItemContent')}>고객 변심에 의한 교환 시 왕복 배송비는 고객 부담입니다.</li>
                <li className={cx('listItemContent')}>상품 및 포장 상태가 훼손되지 않아야 합니다.</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className={cx('section')}>
          <div className={cx('sectionHeader')}>반품 안내</div>
          <ul className={cx('list')}>
            <li className={cx('listItem')}>
              <span className={cx('listItem')}>반품 신청 기간:</span>{' '}
              <span className={cx('listItemContent')}>상품 수령 후 7일 이내</span>
            </li>
            <li className={cx('listItem')}>
              <span className={cx('listItem')}>반품 가능 사유:</span>
              <ul className={cx('list')}>
                <li className={cx('listItemContent')}>상품 불량 또는 오배송</li>
                <li className={cx('listItemContent')}>단순 변심 (일부 상품 제외)</li>
              </ul>
            </li>
            <li className={cx('listItem')}>
              <span className={cx('listItem')}>반품 절차:</span>
              <ul className={cx('list')}>
                <li className={cx('listItemContent')}>
                  <span className={cx('sectionNumber')}>1.</span> 고객센터(연락처)로 반품 요청
                </li>
                <li className={cx('listItemContent')}>
                  <span className={cx('sectionNumber')}>2.</span> 반품 요청 승인 후, 지정된 택배사를 통해 상품 발송
                </li>
                <li className={cx('listItemContent')}>
                  <span className={cx('sectionNumber')}>3.</span> 반품 상품 도착 및 확인 후 환불 처리
                </li>
              </ul>
            </li>
            <li className={cx('listItem')}>
              <span className={cx('listItem')}>유의 사항:</span>
              <ul className={cx('list')}>
                <li className={cx('listItemContent')}>고객 변심에 의한 반품 시 왕복 배송비는 고객 부담입니다.</li>
                <li className={cx('listItemContent')}>반품 상품의 상태가 훼손되지 않아야 합니다.</li>
                <li className={cx('listItemContent')}>
                  일부 상품은 변심 반품이 불가합니다 (예: 개봉된 식품, 사용된 상품 등).
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className={cx('section')}>
          <div className={cx('sectionHeader')}>환불 안내</div>
          <ul className={cx('list')}>
            <li className={cx('listItem')}>
              <span className={cx('listItem')}>환불 처리 기간:</span>{' '}
              <span className={cx('listItemContent')}>반품 상품 확인 후 3영업일 이내</span>
            </li>
            <li className={cx('listItem')}>
              <span className={cx('listItem')}>환불 방법:</span>{' '}
              <span className={cx('listItemContent')}>결제 수단에 따라 환불 (신용카드, 계좌이체 등)</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
