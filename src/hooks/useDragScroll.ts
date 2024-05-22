import { MouseEvent, useCallback, useRef } from 'react';

export default function useDragScroll<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const isDragRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  const preventUnexpectedEffects = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragStart = (e: MouseEvent) => {
    e.preventDefault(); // 요소를 잡고 스크롤 할 때 요소가 드래그 앤 드롭 돼서 스크롤 되지 않는 현상 방지

    if (!containerRef.current) {
      return;
    }

    isDragRef.current = true;
    startXRef.current = e.clientX + containerRef.current.scrollLeft;
    startScrollRef.current = containerRef.current.scrollLeft;
  };

  const handleDragEnd = () => {
    if (!isDragRef.current || !containerRef.current) {
      return;
    }

    isDragRef.current = false;

    const endScroll = containerRef.current.scrollLeft;

    const childNodes = containerRef.current.childNodes;
    const dragDiff = Math.abs(startScrollRef.current - endScroll);

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
    if (!isDragRef.current || !containerRef.current) {
      return;
    }

    containerRef.current.scrollLeft = startXRef.current - e.clientX;
  };

  return {
    ref: containerRef,
    onMouseDown: handleDragStart,
    onMouseMove: handleDragMove,
    onMouseUp: handleDragEnd,
    onMouseLeave: handleDragEnd,
  };
}
