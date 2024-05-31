import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import Input from '../../common/Input';
import styles from './SignupForm.module.scss';
import Button from '@/components/common/Button';
import UserAgreement from './UserAgreement';

const cx = classNames.bind(styles);

export interface FormProps {
  nickname: string;
  phoneNumber: string;
  ageCheck: boolean;
  serviceAgreement: boolean;
  privatePolicy: boolean;
  marketingAgreement: boolean;
}

const formSchema = Yup.object().shape({
  nickname: Yup.string().trim().max(30, '닉네임을 30자 이내로 입력해주세요').required('닉네임을 입력해주세요'),
  phoneNumber: Yup.string()
    .matches(/^\d{3}-\d{3,4}-\d{4}$/, '연락처를 000-0000-0000 형식에 맞게 입력해주세요')
    .required('연락처를 입력해주세요'),
  ageCheck: Yup.boolean().oneOf([true], '해당 항목은 반드시 체크해야 합니다').required(),
  serviceAgreement: Yup.boolean().oneOf([true], '서비스 이용약관에 동의해야 합니다').required(),
  privatePolicy: Yup.boolean().oneOf([true], '개인정보 수집 및 이용에 동의해야 합니다').required(),
  marketingAgreement: Yup.boolean().required(),
});

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      nickname: '',
      phoneNumber: '',
      ageCheck: false,
      serviceAgreement: false,
      privatePolicy: false,
      marketingAgreement: false,
    },
  });
  const onSubmit: SubmitHandler<FormProps> = data => console.log(data);
  console.log(errors);
  console.log(onSubmit);
  return (
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
        {errors.nickname && <p style={{ color: 'red' }}>{errors.nickname.message}</p>}
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
        {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber.message}</p>}
      </div>
      <div>
        <UserAgreement
          id="userAgreement"
          service={register('serviceAgreement')}
          privatePolicy={register('privatePolicy')}
          marketing={register('marketingAgreement')}
        />
        {errors.serviceAgreement && <p style={{ color: 'red' }}>{errors.serviceAgreement.message}</p>}
        {errors.privatePolicy && <p style={{ color: 'red' }}>{errors.privatePolicy.message}</p>}
      </div>
      <div className={cx('buttonArea')}>
        <div className={cx('ageCheck')}>
          <input id="ageCheck" type="checkbox" className={cx('checkBox')} {...register('ageCheck')} />
          <span className={cx('ageCheckText')}>본인은 만 14세 이상입니다.</span>
          {errors.ageCheck && <p style={{ color: 'red' }}>{errors.ageCheck.message}</p>}
        </div>
        <Button size="large" backgroundColor="$color-pink-main">
          가입하기
        </Button>
      </div>
    </form>
  );
}
