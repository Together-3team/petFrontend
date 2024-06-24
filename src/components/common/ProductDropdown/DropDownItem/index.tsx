import styles from './DropDownItem.module.scss';

type TData = {
  label: string;
};

type TItemProps = {
  data: TData;
};

function DropDownItem({ data }: TItemProps) {
  const { label } = data;
  return (
    <div className={styles.wrap}>
      <div className={`${styles.box}`}>
        <span className={styles.text}>{label}</span>
      </div>
    </div>
  );
}

export default DropDownItem;
