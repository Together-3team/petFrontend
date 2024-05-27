import { MouseEvent, useCallback, useRef } from 'react';

/*
가로 스크롤이 있는 경우에 드래그로 스크롤을 가능하게 해줍니다.

container요소에 스프레드 문법으로 풀어주면 돼서 사용이 간단합니다.
container요소에 CSS overflow-x: scroll;만 추가하면 됩니다.

사용)
[Example.tsx]
export default function Example() {
  const dragScrollProps = useDragScroll<HTMLDivElement>();

  return (
    <div className={styles.container} {...dragScrollProps}>
      <ul className={styles.list}>
        <li className={styles.item}>아이템1</li>
        <li className={styles.item}>아이템2</li>
        <li className={styles.item}>아이템3</li>
        <li className={styles.item}>아이템4</li>
        <li className={styles.item}>아이템5</li>
      </ul>
    </div>
  )
}

[Example.module.scss]
.container {
  overflow-x: scroll;
  width: 36rem;
}

.list {
  display: flex;
  white-space: nowrap;
}

*/

export default function useDragScroll<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragDiffRef = useRef(0);

  const preventUnexpectedEffects = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragStart = (e: MouseEvent) => {
    e.preventDefault(); // 요소를 잡고 스크롤 할 때 요소가 드래그 앤 드롭 돼서 스크롤 되지 않는 현상 방지

    if (!containerRef.current) {
      return;
    }

    isDraggingRef.current = true;
    startXRef.current = e.clientX + containerRef.current.scrollLeft;
    dragDiffRef.current = 0;
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current || !containerRef.current) {
      return;
    }

    isDraggingRef.current = false;
    const childNodes = containerRef.current.childNodes;
    const dragDiff = dragDiffRef.current;

    if (dragDiff > 5) {
      childNodes.forEach(child => {
        child.addEventListener('click', preventUnexpectedEffects);
      });
    } else {
      childNodes.forEach(child => {
        child.removeEventListener('click', preventUnexpectedEffects);
      });
    }
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) {
      return;
    }

    const scrollLeft = startXRef.current - e.clientX;
    containerRef.current.scrollLeft = scrollLeft;
    dragDiffRef.current += Math.abs(scrollLeft);
  };

  return {
    ref: containerRef,
    onMouseDown: handleDragStart,
    onMouseMove: handleDragMove,
    onMouseUp: handleDragEnd,
    onMouseLeave: handleDragEnd,
  };
}
