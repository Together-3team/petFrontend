import React, { useState } from 'react';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import DaumPostcode from 'react-daum-postcode';
import styles from './AddressInput.module.scss';
import Input from '../common/Input';
import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
import { deliveryFormSchema } from '@/utils/deliveryFormSchema';

export type FormValues = Yup.InferType<typeof deliveryFormSchema>;

interface AddressInputProps {
  errors: any;
  register: UseFormRegister<FormValues>;
}

const cx = classNames.bind(styles);

export default function AddressInput({ errors, register, ...rest }: AddressInputProps) {
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div>
      <div>
        <div>
          <Input
            id="zipCode"
            type="text"
            size="large"
            label="우편번호"
            isError={errors.zipCode && true}
            labelStyle={'label'}
            placeholder=""
            value={zonecode}
            {...register('zipCode')}
          />
          <button type="button" onClick={toggleHandler}>
            우편번호 찾기
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
        <Input
          id="address"
          type="text"
          size="large"
          label="주소"
          isError={errors.address && true}
          labelStyle={'label'}
          placeholder=""
          value={address}
          {...register('address')}
        />
        <Input
          id="detailedAddress"
          type="text"
          size="large"
          label="상세 주소"
          isError={errors.detailedAddress && true}
          labelStyle={'label'}
          placeholder="상세주소"
          {...register('detailedAddress')}
        />
      </div>
    </div>
  );
}
