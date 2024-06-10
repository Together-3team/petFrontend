import { useEffect, useRef } from 'react';

export default function usePreviousValue<T>(value: T) {
  const previousValueRef = useRef<T>();

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  return previousValueRef.current;
}
