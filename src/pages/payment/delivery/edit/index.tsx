import classNames from 'classnames/bind';
import * as Yup from 'yup';

import styles from './Edit.module.scss';

import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import Input from '@/components/common/Input';
import { deliveryFormSchema } from '@/utils/deliveryFormSchema';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UserAgreement from '@/components/auth/SignupForm/UserAgreement';
import CheckOnly from '@/components/common/CheckOnly';
import Button from '@/components/common/Button';
import AddressInput from '@/components/payment/AddressInput';

const cx = classNames.bind(styles);

export type FormValues = Yup.InferType<typeof deliveryFormSchema>;

export default function DeliveryEditPage() {
  // const [description, setDescription] = useState('');

  // const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //   setDescription(event.target.value);
  // };
  // const isBtnDisabled = rating === 0 || description.trim() === '';

  const methods = useForm<FormValues>({
    resolver: yupResolver(deliveryFormSchema),
  });
  const {
    formState: { errors },
  } = methods;
  const { register, handleSubmit } = methods;
  const onSubmit = (data: FormValues) => console.log(data);
  console.log(errors);

  return (
    <div className={styles.deliveryEditPage}>
      <div className={styles.deliveryEditPage}>
        <Header.Root>
          <Header.Box>
            <Header.Left>
              <BackButton />
            </Header.Left>
            <h1 className={cx('header')}>배송지 수정</h1>
          </Header.Box>
        </Header.Root>
      </div>
      <FormProvider {...methods}>
        <form className={cx('deliveryEditForm')} onSubmit={handleSubmit(onSubmit)}>
          <div className={cx('inputArea')}>
            <div>
              <Input
                id="name"
                type="text"
                size="large"
                label="배송지명"
                isError={errors.name && true}
                labelStyle={'label'}
                placeholder="예) 집, 회사"
                {...register}
              />
              {errors.name && <span className={cx('errorText')}>{errors.name.message}</span>}
            </div>
            <div>
              <Input
                id="recipient"
                type="text"
                size="large"
                label="받는 사람"
                isError={errors.recipient && true}
                labelStyle={'label'}
                placeholder="이름"
                {...register('recipient')}
              />
              {errors.recipient && <span className={cx('errorText')}>{errors.recipient.message}</span>}
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
            <AddressInput errors={errors} {...register('phoneNumber')} />
          </div>
          <div className={cx('buttonArea')}>
            <div className={cx('ageCheck')}>
              <div className={cx('ageCheckInput')}>
                <input id="ageCheck" type="checkbox" className={cx('checkBox')} {...register('isDefault')} />
                <span className={cx('ageCheckText')}>기본 배송지로 등록합니다.</span>
                {errors.isDefault && (
                  <span className={cx('errorText', 'ageCheckErrorText')}>{errors.isDefault.message}</span>
                )}
              </div>
            </div>
            <Button size="large" backgroundColor="$color-pink-main">
              가입하기
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
