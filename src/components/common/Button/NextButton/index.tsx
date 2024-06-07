import Link from 'next/link';
import RightArrow from '@/assets/svgs/right-arrow.svg';
import styles from './NextButton.module.scss';

interface NextButtonProps {
  text: string;
  href: string;
}

export default function NextButton({ text, href }: NextButtonProps) {
  return (
    <Link href={href}>
      <button className={styles.nextButton}>
        <span>{text}</span>
        <RightArrow width={24} height={32} alt="페이지 이동 아이콘" />
      </button>
    </Link>
  );
}
