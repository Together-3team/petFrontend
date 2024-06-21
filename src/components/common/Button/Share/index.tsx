import styles from './ShareButton.module.scss';
import ShareIcon from '@/assets/svgs/share.svg';
import CheckIcon from '@/assets/svgs/check-white.svg';
import useCopyClipboard from '@/hooks/useCopyClipboard';

export default function ShareButton() {
  const { isCopied, copyHandler } = useCopyClipboard();

  const handleCopy = () => {
    if (typeof window === 'undefined') {
      return;
    }

    copyHandler(window.location.href);
  };

  return (
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
  );
}
