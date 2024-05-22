import { MouseEvent, useCallback, useRef, useState } from 'react';

export default function useDragScroll<T extends HTMLElement>() {
  const scrollRef = useRef<T>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScroll, setStartScroll] = useState(0);

  const preventUnexpectedEffects = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragStart = (e: MouseEvent) => {
    e.preventDefault(); // 요소를 잡고 스크롤 할 때 요소가 드래그 앤 드롭 돼서 스크롤 되지 않는 현상 방지

    if (!scrollRef.current) {
      return;
    }

    setIsDrag(true);
    setStartX(e.clientX + scrollRef.current.scrollLeft);
    setStartScroll(scrollRef.current.scrollLeft);
  };

  const handleDragEnd = () => {
    if (!isDrag || !scrollRef.current) {
      return;
    }

    setIsDrag(false);

    const endScroll = scrollRef.current.scrollLeft;

    const childNodes = scrollRef.current.childNodes;
    const dragDiff = Math.abs(startScroll - endScroll);

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

  /**
   * @todo 쓰로틀 or requestAnimationFrame 적용 필요
   */
  const handleDragMove = (e: MouseEvent) => {
    if (!isDrag || !scrollRef.current) {
      return;
    }

    scrollRef.current.scrollLeft = startX - e.clientX;
  };

  return {
    ref: scrollRef,
    onMouseDown: handleDragStart,
    onMouseMove: handleDragMove,
    onMouseUp: handleDragEnd,
    onMouseLeave: handleDragEnd,
  };
}
