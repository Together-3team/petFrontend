'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import signupFormSchema from '@/utils/signupFormSchema';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import UserAgreement from './UserAgreement';
import authAPI from '@/apis/authAPI';

import styles from './SignupForm.module.scss';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

export type FormValues = Yup.InferType<typeof signupFormSchema> & { profileToken?: string };

export default function SignupForm() {
  const router = useRouter();
  const { email, profileToken } = router.query;
  const queryClient = useQueryClient();
  console.log(profileToken);
  const mutation = useMutation<void, Error, FormValues>({
    mutationFn: async (data: FormValues) => {
      await authAPI.postRegisterData({ ...data, profileToken });
    },
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['register'] });
      router.push('/onboarding');
    },
    onError: error => {
      console.error('회원가입 실패', error);
    },
  });

  const methods = useForm<FormValues>({
    resolver: yupResolver(signupFormSchema),
  });
  const {
    formState: { errors },
  } = methods;
  const { register, handleSubmit } = methods;
  const onSubmit = (data: FormValues) => {
    console.log(data), mutation.mutate(data);
  };
  console.log(errors);
  //TODO: 폼 필수요소 미입력 시 버튼 disable
  return (
    <FormProvider {...methods}>
      <form className={cx('signupForm')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('inputArea')}>
          <Input
            id="email"
            type="email"
            size="large"
            label="이메일"
            labelStyle={'label'}
            placeholder={email as string}
            readOnly
            {...register}
          />
          <div>
            <Input
              id="nickname"
              type="text"
              size="large"
              label="닉네임"
              isError={errors.nickname && true}
              labelStyle={'label'}
              placeholder=""
              {...register('nickname')}
            />
            {errors.nickname && <span className={cx('errorText')}>{errors.nickname.message}</span>}
          </div>
          <div>
            <Input
              id="phoneNumber"
              type="tel"
              size="large"
              label="연락처"
              isError={errors.phoneNumber && true}
              labelStyle={'label'}
              placeholder="000-0000-0000"
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && <span className={cx('errorText')}>{errors.phoneNumber.message}</span>}
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
            <div className={cx('ageCheckInput')}>
              <input id="ageCheck" type="checkbox" className={cx('checkBox')} {...register('ageCheck')} />
              <span className={cx('ageCheckText')}>본인은 만 14세 이상입니다.</span>
              {errors.ageCheck && (
                <span className={cx('errorText', 'ageCheckErrorText')}>{errors.ageCheck.message}</span>
              )}
            </div>
          </div>
          <Button size="large" backgroundColor="$color-pink-main">
            가입하기
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
