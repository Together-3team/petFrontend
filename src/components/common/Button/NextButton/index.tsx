import Link from 'next/link';
import { PropsWithChildren } from 'react';
import RightArrow from '@/assets/svgs/right-arrow.svg';
import styles from './NextButton.module.scss';

interface NextButtonProps {
  href: string;
  onClick?: () => void;
}

export default function NextButton({ children, ...rest }: PropsWithChildren<NextButtonProps>) {
  return (
    <Link className={styles.nextButton} {...rest}>
      <span>{children}</span>
      <RightArrow width={24} height={32} alt="페이지 이동 아이콘" />
    </Link>
  );
}
