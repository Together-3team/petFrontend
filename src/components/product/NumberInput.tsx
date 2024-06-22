import React, { useState } from 'react';

export default function NumberInput({ initialAmount }: { initialAmount: number }) {
  const [count, setCount] = useState(initialAmount);

  const increment = () => {
    setCount(prevCount => prevCount + 1); // 이전 상태를 기반으로 +1 증가
  };

  const decrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1); // 이전 상태를 기반으로 -1 감소 (0 미만으로 내려가지 않음)
    }
  };

  return (
    <div>
      <h2>현재 숫자: {count}</h2>
      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>
    </div>
  );
}
