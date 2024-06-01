import styles from './CheckOnly.module.scss';

export default function CheckOnly({ id }: { id: string }) {
  return (
    <>
      <label htmlFor={id} className={styles.checkboxLabel}>
        <input id={id} type="checkbox" className={styles.checkboxInput} />
        <div className={styles.checkIcon} />
      </label>
    </>
  );
}
