import React from 'react';
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

  const themeObj = {
    bgColor: '#FFFFFF',
    pageBgColor: '#FFFFFF',
    postcodeTextColor: '#FE5A65',
    emphTextColor: '#222222',
  };

  const postCodeStyle = {
    width: '34rem',
    height: '47rem',
  };

  //data는 사용자가 선택한 주소 정보(zonecode, address...)를 담고 있는 객체
  const completeHandler = (data: any) => {
    const { address, zonecode } = data;
    setValue('zipCode', zonecode);
    setValue('address', address);
  };

  return (
    <div>
      <div className={cx('addressInputContainer')}>
        <div className={cx('inputContainer')}>
          <div className={cx('zipCode')}>
            <Input
              id="zipCode"
              type="text"
              size="full"
              label="우편번호"
              labelStyle={'label'}
              placeholder=""
              autoComplete="none"
              {...register('zipCode')}
              readOnly
            />
            <button type="button" onClick={handleModalOpen} className={cx('button')}>
              우편번호 찾기
            </button>
          </div>
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
        <div className={cx('inputContainer')}>
          <Input
            id="address"
            type="text"
            size="full"
            label="주소"
            labelStyle={'label'}
            placeholder=""
            autoComplete="none"
            readOnly
            {...register('address')}
          />
        </div>
        <div className={cx('inputContainer')}>
          <Input
            id="detailedAddress"
            type="text"
            size="full"
            label="상세 주소"
            isError={errors.detailedAddress && true}
            labelStyle={'label'}
            placeholder="상세주소"
            {...register('detailedAddress')}
          />
          {errors.detailedAddress && <span className={cx('errorText')}>{errors.detailedAddress.message}</span>}
        </div>
      </div>
    </div>
  );
}
