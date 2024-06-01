import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import Input from '@/components/common/Input';
import styles from './SignupForm.module.scss';
import Button from '@/components/common/Button';
import UserAgreement from './UserAgreement';

const cx = classNames.bind(styles);

// TODO: 닉네임 중복 검사
const formSchema = Yup.object().shape({
  nickname: Yup.string()
    .trim()
    .matches(/^[가-힣a-zA-Z0-9]+$/, '2~8자의 한글, 영어, 숫자만 가능합니다.')
    .min(2, '2~8자의 한글, 영어, 숫자만 가능합니다.')
    .max(8, '2~8자의 한글, 영어, 숫자만 가능합니다.')
    .required('닉네임을 입력해주세요.'),
  phoneNumber: Yup.string()
    .matches(/^\d{3}-\d{3,4}-\d{4}$/, '연락처 입력 형식을 확인해주세요. (000-0000-0000)')
    .required('연락처를 입력해주세요'),
  ageCheck: Yup.boolean().oneOf([true], '해당 항목을 표시해야 합니다.').required(),
  serviceAgreement: Yup.boolean().oneOf([true], '필수 이용약관에 동의해야 합니다.').required(),
  privatePolicy: Yup.boolean().oneOf([true], '필수 이용약관에 동의해야 합니다.').required(),
  marketingAgreement: Yup.boolean().required(),
});

export type FormValues = Yup.InferType<typeof formSchema>;

export default function SignupForm() {
  const methods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });
  const {
    formState: { errors },
  } = methods;
  const { register, handleSubmit } = methods;
  const onSubmit = (data: FormValues) => console.log(data);
  console.log(errors);

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
            placeholder="이메일을 입력해주세요"
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
              placeholder="닉네임을 입력해주세요"
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
