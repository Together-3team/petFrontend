import Link from 'next/link';
import classNames from 'classnames/bind';

import styles from './Toast.module.scss';
import { ToastStatus, ToastType } from '@/types/components/toast';
import useToast from '@/hooks/useToast';

import CheckWhiteIcon from '@/assets/svgs/check-white.svg';
import WarningIcon from '@/assets/svgs/warning.svg';

const cx = classNames.bind(styles);

interface ToastProps extends ToastType {}

export function Toast({ id, status, message, linkMessage, linkProps }: ToastProps) {
  const { statusClassName, StatusIcon } = getStatusStyles(status);
  const { hideToast } = useToast();

  const hasLink = linkMessage && linkProps;

  return (
    <div id={id} className={cx('toast', statusClassName)} onClick={() => hideToast(id)}>
      <span className={styles.icon}>
        <StatusIcon />
      </span>
      <span className={styles.message}>{message}</span>
      {hasLink && (
        <Link className={styles.link} {...linkProps}>
          {linkMessage}
        </Link>
      )}
    </div>
  );
}

interface ToastListProps {
  items: ToastType[];
}

export default function ToastList({ items }: ToastListProps) {
  return (
    <>
      {items.length > 0 && (
        <div className={styles.toastList}>
          {items.map(item => (
            <Toast key={item.id} {...item} />
          ))}
        </div>
      )}
    </>
  );
}

function getStatusStyles(status: ToastStatus) {
  let defaultClassName = 'success';
  let defaultIcon = CheckWhiteIcon;

  switch (status) {
    case 'error':
      defaultClassName = 'error';
      defaultIcon = WarningIcon;
      break;
    case 'warn':
      defaultClassName = 'warn';
      defaultIcon = WarningIcon;
      break;
  }

  return {
    statusClassName: defaultClassName,
    StatusIcon: defaultIcon,
  };
}
