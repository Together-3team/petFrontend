import { useFormContext } from 'react-hook-form';
import { FormValues } from '@/components/auth/SignupForm';
import styles from './CheckOnly.module.scss';

interface CheckOnlyProps {
  name: 'nickname' | 'phoneNumber' | 'ageCheck' | 'serviceAgreement' | 'privatePolicy' | 'marketingAgreement';
}

export default function CheckOnly({ name }: CheckOnlyProps) {
  const { register } = useFormContext<FormValues>();
  return (
    <>
      <label className={styles.checkboxLabel}>
        <input type="checkbox" className={styles.checkboxInput} {...register(name)} />
        <div className={styles.checkIcon} />
      </label>
    </>
  );
}
