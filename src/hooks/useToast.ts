import { useContext } from 'react';

import { ToastContext } from '@/components/common/Toast/Provider';

export default function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('ToastProvider 안에서 사용해 주세요.');
  }

  const { showToast, hideToast } = context;

  return { showToast, hideToast };
}
