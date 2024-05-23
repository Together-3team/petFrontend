import { MouseEvent, useCallback, useRef } from 'react';

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
