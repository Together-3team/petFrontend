import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps extends PropsWithChildren {
  id: string;
}

export default function Portal({ id, children }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined' || !mounted) {
    return null;
  }

  const element = document.getElementById(id);

  return element ? createPortal(children, element) : null;
}
