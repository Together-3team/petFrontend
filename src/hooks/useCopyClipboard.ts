import { useEffect, useState } from 'react';

/*
  text를 복사하는 훅입니다.

  사용⭐️)
  export default function Example() {
    const { isCopied, copyHandler } = useCopyClipboard();

    const handleCopy = () => {
      if (typeof window === 'undefined') {
        return;
      }

      copyHandler(window.location.href);
    };

    return (
      <button onClick={handleCopy}>복사</button>
    )
  }

*/
export default function useCopyClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (text: string) => {
    if (isCopied) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isCopied]);

  return {
    isCopied,
    copyHandler: handleCopy,
  };
}
