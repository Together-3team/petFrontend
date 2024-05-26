import { useEffect, useRef } from 'react';

export default function useScrollIntoViewWithPath<T extends HTMLElement>(
  path: string,
  options?: ScrollIntoViewOptions
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const scrollIntoViewOptions = {
      ...options,
    };

    ref.current.scrollIntoView(scrollIntoViewOptions);
  }, [path, options]);

  return { ref };
}
