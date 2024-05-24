import { useState, useEffect } from 'react';
import ModalPortal from '@/components/Portal';

export default function My() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <ModalPortal>
          <div></div>
        </ModalPortal>
      )}
    </>
  );
}
