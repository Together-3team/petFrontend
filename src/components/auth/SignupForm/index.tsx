'use client';

import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import signupFormSchema from '@/utils/signupFormSchema';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import UserAgreement from './UserAgreement';
import authApi from '@/apis/authApi';
import checkNickname from '@/utils/checkNickname';
import insertPhoneNumberHyphen from '@/utils/insertPhoneNumberHyphen';

import styles from './SignupForm.module.scss';

const cx = classNames.bind(styles);

export type FormValues = Yup.InferType<typeof signupFormSchema> & { profileToken?: string };

export default function SignupForm() {
  const router = useRouter();
  const { email, profileToken } = router.query;
  const [cookies, setCookie, removeCookies] = useCookies(['accessToken', 'refreshToken']);

  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: FormValues) => {
      const response = await authApi.postRegisterData({ ...data, profileToken });
      return response.data;
    },
    onSuccess: data => {
      console.log(data);
      const { accessToken, refreshToken } = data;
      setCookie('accessToken', accessToken, {
        path: '/',
      });
      setCookie('refreshToken', refreshToken, {
        path: '/',
      });
      router.push({
        pathname: '/onboarding',
      });
    },
    onError: error => {
      console.error('회원가입 실패', error);
    },
  });

  const methods = useForm<FormValues>({
    resolver: yupResolver(signupFormSchema),
    mode: 'onBlur',
  });
  const {
    formState: { isValid, errors },
    setError,
  } = methods;
  const { register, handleSubmit, control, setValue } = methods;

  function handleChangePhoneNumber(e: ChangeEvent<HTMLInputElement>) {
    const formattedValue = insertPhoneNumberHyphen(e.target.value);
    setValue('phoneNumber', formattedValue);
  }

  const onSubmit = (data: FormValues) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form className={cx('signupForm')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('inputArea')}>
          <div>
            <Input
              id="email"
              type="email"
              size="large"
              label="이메일"
              labelStyle={'label'}
              placeholder={email as string}
              background="background"
              readOnly
              {...register}
            />
          </div>
          <div>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="nickname"
                  type="text"
                  size="large"
                  label="닉네임"
                  isError={errors.nickname && true}
                  onBlur={async e => {
                    field.onBlur();
                    await checkNickname(e.target.value);
                  }}
                  labelStyle={'label'}
                  placeholder="2~8자의 한글, 영어, 숫자를 입력해주세요"
                />
              )}
              {...register('nickname')}
            />
            {errors.nickname && <span className={cx('errorText')}>{errors.nickname.message}</span>}
          </div>
          <div>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="phoneNumber"
                  type="tel"
                  size="large"
                  label="연락처"
                  onBlur={() => {
                    field.onBlur();
                  }}
                  onChange={handleChangePhoneNumber}
                  isError={errors.phoneNumber && true}
                  labelStyle={'label'}
                  placeholder="010-0000-0000 형식으로 입력해주세요"
                />
              )}
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && <span className={styles.errorText}>{errors.phoneNumber.message}</span>}
          </div>
        </div>
        <div>
          <UserAgreement />
          {!errors.privatePolicy && errors.serviceAgreement && (
            <span className={cx('errorText')}>{errors.serviceAgreement.message}</span>
          )}
          {!errors.serviceAgreement && errors.privatePolicy && (
            <span className={cx('errorText')}>{errors.privatePolicy.message}</span>
          )}
          {errors.serviceAgreement && errors.privatePolicy && (
            <span className={cx('errorText')}>{errors.serviceAgreement.message}</span>
          )}
        </div>
        <div className={cx('buttonArea')}>
          <div className={cx('ageCheck')}>
            <label className={cx('ageCheckInput')}>
              <input id="ageCheck" type="checkbox" className={cx('checkBox')} {...register('ageCheck')} />
              <span className={cx('ageCheckText')}>본인은 만 14세 이상입니다.</span>
              {errors.ageCheck && (
                <span className={cx('errorText', 'ageCheckErrorText')}>{errors.ageCheck.message}</span>
              )}
            </label>
          </div>
          <Button type="submit" size="large" backgroundColor="$color-pink-main" disabled={!isValid}>
            가입하기
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
