import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import Input from '../../common/Input';
import styles from './SignupForm.module.scss';
import Button from '@/components/common/Button';
import UserAgreement from './UserAgreement';

const cx = classNames.bind(styles);

interface FormProps {
  nickname: string;
  phoneNumber: number;
}

const formSchema = Yup.object().shape({
  nickname: Yup.string().trim().max(30, '닉네임을 30자 이내로 입력해주세요').required('닉네임을 입력해주세요'),
  phoneNumber: Yup.number().required('연락처를 입력해주세요'),
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
    },
  });
  const onSubmit: SubmitHandler<FormProps> = data => console.log(data);
  console.log(errors);
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
          placeholder="연락처를 입력해주세요"
          {...register}
        />
        {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber.message}</p>}
      </div>
      <div>
        <UserAgreement />
      </div>
      <div className={cx('buttonArea')}>
        <div className={cx('ageCheck')}>
          <input type="checkbox" className={cx('checkBox')} />
          <span className={cx('ageCheckText')}>본인은 만 14세 이상입니다.</span>
        </div>
        <Button size="large" backgroundColor="$color-pink-main">
          가입하기
        </Button>
      </div>
    </form>
  );
}
