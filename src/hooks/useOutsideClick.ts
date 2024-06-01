import { RefObject, useEffect } from 'react';

export default function useOutsideClick(ref: RefObject<HTMLElement>, handler?: (event: MouseEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || !(event.target instanceof Element) || ref.current.contains(event.target)) {
        return;
      }

      if (handler) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}
