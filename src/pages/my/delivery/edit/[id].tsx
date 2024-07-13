import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { deliveryFormSchema } from '@/utils/deliveryFormSchema';
import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import AddressInput from '@/components/payment/AddressInput';
import { GetServerSidePropsContext } from 'next';
import { DeliveryInfo } from '@/types/components/delivery';
import { httpClient } from '@/apis/httpClient';
import { useUpdateAddressInfo } from '@/hooks/useUpdateAddressInfo';
import insertPhoneNumberHyphen from '@/utils/insertPhoneNumberHyphen';

import styles from './Edit.module.scss';

const cx = classNames.bind(styles);

export type FormValues = Yup.InferType<typeof deliveryFormSchema>;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const deliveryId = context.params?.['id'];
  const accessToken = context.req.cookies['accessToken'];
  if (!accessToken) {
    return {
      redirect: {
        destination: '/my',
        permanent: false,
      },
    };
  }

  let delivery;
  try {
    delivery = await httpClient().get<DeliveryInfo>(`/deliveries/${deliveryId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      delivery: delivery,
    },
  };
}

export default function DeliveryEditPage({ delivery }: { delivery: DeliveryInfo }) {
  const { id, name, recipient, recipientPhoneNumber, zipCode, address, detailedAddress, isDefault } = delivery;
  const methods = useForm<FormValues>({
    resolver: yupResolver(deliveryFormSchema),
    mode: 'all',
    defaultValues: {
      name,
      recipient,
      recipientPhoneNumber,
      zipCode,
      address,
      detailedAddress,
      isDefault,
    },
  });
  const {
    formState: { errors, isValid },
  } = methods;
  const { register, handleSubmit, control, setValue } = methods;
  const router = useRouter();
  const prevPath = router.query?.prevPath;
  const { mutate: updateAddressInfo } = useUpdateAddressInfo(prevPath);

  const onSubmit = (addressInfo: FormValues) => {
    updateAddressInfo({ id, addressInfo });
  };

  function handleChangePhoneNumber(e: ChangeEvent<HTMLInputElement>) {
    const formattedValue = insertPhoneNumberHyphen(e.target.value);
    setValue('recipientPhoneNumber', formattedValue);
  }

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
            <div className={cx('inputContainer')}>
              <Input
                id="name"
                type="text"
                size="full"
                label="배송지명"
                isError={errors.name && true}
                labelStyle={'label'}
                placeholder="예) 집, 회사"
                {...register('name')}
              />
              {errors.name && <span className={cx('errorText')}>{errors.name.message}</span>}
            </div>
            <div className={cx('inputContainer')}>
              <Input
                id="recipient"
                type="text"
                size="full"
                label="받는 사람"
                isError={errors.recipient && true}
                labelStyle={'label'}
                placeholder="이름"
                {...register('recipient')}
              />
              {errors.recipient && <span className={cx('errorText')}>{errors.recipient.message}</span>}
            </div>
            <div className={cx('inputContainer')}>
              <Controller
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="recipientPhoneNumber"
                    type="tel"
                    size="full"
                    label="연락처"
                    onBlur={() => {
                      field.onBlur();
                    }}
                    onChange={handleChangePhoneNumber}
                    isError={errors.recipientPhoneNumber && true}
                    labelStyle={'label'}
                    placeholder="010-0000-0000"
                  />
                )}
                {...register('recipientPhoneNumber')}
              />
              {errors.recipientPhoneNumber && (
                <span className={cx('errorText')}>{errors.recipientPhoneNumber.message}</span>
              )}
            </div>
            <AddressInput errors={errors} register={register} setValue={setValue} />
          </div>
          <div className={cx('buttonArea')}>
            <div className={cx('isDefaultInput')}>
              <input
                id="isDefault"
                type="checkbox"
                className={cx(isDefault ? 'checkBoxGray' : 'checkBox')}
                checked={isDefault ? isDefault : undefined}
                {...register('isDefault')}
              />
              <span className={cx('isDefaultText')}>기본 배송지로 등록합니다.</span>
              {errors.isDefault && (
                <span className={cx('errorText', 'isDefaultErrorText')}>{errors.isDefault.message}</span>
              )}
            </div>
            <div className={cx('button')}>
              <Button size="large" backgroundColor="$color-pink-main" disabled={!isValid} type="submit">
                저장
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
