import styles from './IntroView.module.scss';
import LogoFull from '@/components/common/Icon/LogoFull';
import ShareIcon from '@/assets/svgs/share.svg';
import CheckIcon from '@/assets/svgs/check-white.svg';
import useCopyClipboard from '@/hooks/useCopyClipboard';

export default function IntroView() {
  const { isCopied, copyHandler } = useCopyClipboard();

  const handleCopy = () => {
    if (typeof window === 'undefined') {
      return;
    }

    copyHandler(window.location.href);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <LogoFull />
      </header>
      <div className={styles.title}>
        <p className={styles.titleMain}>반려동물 용품, 공구로 더 저렴하게!</p>
        <p className={styles.titleSub}>링크 공유하고 친구와 함께 할인받으세요</p>
      </div>
      <footer className={styles.footer}>
        <button type="button" className={styles.shareButton} onClick={handleCopy} data-copied={isCopied}>
          {!isCopied ? (
            <>
              <ShareIcon />
              링크 복사하기
            </>
          ) : (
            <>
              <CheckIcon />
              링크 복사 완료!
            </>
          )}
        </button>
      </footer>
    </div>
  );
}
