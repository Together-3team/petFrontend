import classNames from 'classnames/bind';
import * as Yup from 'yup';

import styles from './Edit.module.scss';

import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import Input from '@/components/common/Input';
import { deliveryFormSchema } from '@/utils/deliveryFormSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const cx = classNames.bind(styles);

export type FormValues = Yup.InferType<typeof deliveryFormSchema>;

export default function DeliveryEditPage() {
  // const [description, setDescription] = useState('');

  // const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //   setDescription(event.target.value);
  // };
  // const isBtnDisabled = rating === 0 || description.trim() === '';

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
      <Input id="addressName" label="배송지명" type="" placeholder="예) 집, 회사" />
    </div>
  );
}
