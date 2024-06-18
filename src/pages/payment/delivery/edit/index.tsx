import classNames from 'classnames/bind';
import * as Yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { deliveryFormSchema } from '@/utils/deliveryFormSchema';
import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import AddressInput from '@/components/payment/AddressInput';
import styles from './Edit.module.scss';

const cx = classNames.bind(styles);

export type FormValues = Yup.InferType<typeof deliveryFormSchema>;

export default function DeliveryEditPage() {
  const methods = useForm<FormValues>({
    resolver: yupResolver(deliveryFormSchema),
    mode: 'all',
  });
  const {
    formState: { errors, isValid },
  } = methods;
  const { register, handleSubmit, setValue } = methods;
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className={styles.deliveryEditPage}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <h1 className={cx('header')}>배송지 수정</h1>
        </Header.Box>
      </Header.Root>
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
                {...register('name')}
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
            <AddressInput errors={errors} register={register} setValue={setValue} />
          </div>
          <div className={cx('buttonArea')}>
            <div className={cx('isDefaultInput')}>
              <input id="isDefault" type="checkbox" className={cx('checkBox')} {...register('isDefault')} />
              <span className={cx('isDefaultText')}>기본 배송지로 등록합니다.</span>
              {errors.isDefault && (
                <span className={cx('errorText', 'isDefaultErrorText')}>{errors.isDefault.message}</span>
              )}
            </div>
            <Button size="large" backgroundColor="$color-pink-main" disabled={!isValid}>
              저장
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
