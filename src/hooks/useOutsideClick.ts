import { RefObject, useEffect } from 'react';

/*
  ref는 가장 상위 요소에 넣으면 됩니다.
  handler에 외부를 눌렀을 때 동작할 함수를 넣으시면 됩니다.

  사용)
  export default function Example() {
    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    useOutsideClick(containerRef, () => setIsOpen(false));

    return (
      <div ref={containerRef} className={styles.container}>
        {isOpen && (
          <div className={styles.modal}>
            ...
          </div>
        )}
        <button type="button" onClick={() => setIsOpen(prev => !prev)}>example</button>
      </div>
    )
  }
*/
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
