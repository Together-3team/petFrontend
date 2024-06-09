import { useFormContext } from 'react-hook-form';
import styles from './CheckOnly.module.scss';
import { InputHTMLAttributes } from 'react';

export default function CheckOnly({ name, type, className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  const { register } = useFormContext();
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
