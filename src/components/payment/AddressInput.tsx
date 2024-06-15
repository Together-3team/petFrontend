import React, { useState } from 'react';
import classNames from 'classnames/bind';
import DaumPostcode from 'react-daum-postcode';
import styles from './AddressInput.module.scss';
import Input from '../common/Input';

interface AddressInputProps {
  errors: any;
}

const cx = classNames.bind(styles);

export default function AddressInput({ errors, ...rest }: AddressInputProps) {
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [detailedAddress, setDetailedAddress] = useState('');

  const themeObj = {
    bgColor: '#FFFFFF',
    pageBgColor: '#FFFFFF',
    postcodeTextColor: '#FE5A65',
    emphTextColor: '#222222',
  };

  const postCodeStyle = {
    width: '340px',
    height: '440px',
  };

  //data는 사용자가 선택한 주소 정보(zonecode, address...)를 담고 있는 객체
  const completeHandler = (data: any) => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
  };

  const closeHandler = (state: string) => {
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

  const toggleHandler = () => {
    setIsOpen(prevOpenState => !prevOpenState);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailedAddress(event.target.value);
  };

  return (
    <div>
      <div>
        <strong>address</strong>
      </div>
      <div>
        <div>
          <div>{zonecode}</div>
          <button type="button" onClick={toggleHandler}>
            주소 찾기
          </button>
        </div>
        {isOpen && (
          <div className={cx('postCodeModalBackground')} onClick={() => closeHandler('FORCE_CLOSE')}>
            <div className={cx('postCodeModalContainer')}>
              <DaumPostcode
                theme={themeObj}
                style={postCodeStyle}
                onComplete={completeHandler}
                onClose={closeHandler}
                className={cx('postCodeModal')}
              />
            </div>
          </div>
        )}
        <div>{address}</div>
        <input value={detailedAddress} onChange={inputChangeHandler} />
        <Input
          id="detailedAddress"
          type="text"
          size="large"
          label="상세 주소"
          isError={errors.detailedAddress && true}
          labelStyle={'label'}
          placeholder="상세주소"
          {...rest}
        />
      </div>
    </div>
  );
}
