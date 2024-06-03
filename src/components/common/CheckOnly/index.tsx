import { useFormContext } from 'react-hook-form';
import { FormValues } from '@/components/auth/SignupForm';
import styles from './CheckOnly.module.scss';
import { InputHTMLAttributes } from 'react';

interface CheckOnlyProps {
  name?: 'nickname' | 'phoneNumber' | 'ageCheck' | 'serviceAgreement' | 'privatePolicy' | 'marketingAgreement';
}

export default function CheckOnly({
  name,
  type,
  className,
  ...rest
}: CheckOnlyProps & InputHTMLAttributes<HTMLInputElement>) {
  const { register } = useFormContext<FormValues>();
  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        className={`${styles.checkboxInput} ${className}`}
        {...(name && register(name))}
        {...rest}
      />
      <div className={styles.checkIcon} />
    </label>
  );
}
