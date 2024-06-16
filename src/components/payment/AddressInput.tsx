import React, { useState } from 'react';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import DaumPostcode from 'react-daum-postcode';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { deliveryFormSchema } from '@/utils/deliveryFormSchema';
import Input from '../common/Input';
import useModal from '@/hooks/useModal';
import CenterModal from '../common/Modal/Base/CenterModal';
import styles from './AddressInput.module.scss';

export type FormValues = Yup.InferType<typeof deliveryFormSchema>;

interface AddressInputProps {
  errors: any;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

const cx = classNames.bind(styles);

export default function AddressInput({ errors, register, setValue }: AddressInputProps) {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');

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
    setValue('zipCode', zonecode);
    setValue('address', address);
  };

  return (
    <div>
      <div className={cx('addressInputContainer')}>
        <div className={cx('zipCode')}>
          <Input
            id="zipCode"
            type="text"
            size="small"
            label="우편번호"
            isError={errors.zipCode && true}
            labelStyle={'label'}
            placeholder=""
            value={zonecode}
            autoComplete="none"
            {...register('zipCode')}
          />
          <button type="button" onClick={handleModalOpen} className={cx('button')}>
            우편번호 찾기
          </button>
        </div>
        <CenterModal isOpen={modalOpen} onClose={handleModalClose}>
          <DaumPostcode
            theme={themeObj}
            style={postCodeStyle}
            onComplete={completeHandler}
            onClose={handleModalClose}
            className={cx('postCodeModal')}
          />
        </CenterModal>
        <Input
          id="address"
          type="text"
          size="large"
          label="주소"
          isError={errors.address && true}
          labelStyle={'label'}
          placeholder=""
          value={address}
          autoComplete="none"
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
