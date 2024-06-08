import { PropsWithChildren, createContext, useEffect, useState } from 'react';

import { ToastType, ToastParameters } from '@/types/components/toast';

interface ToastContextType {
  toastList: ToastType[];
  showToast: (toast: ToastParameters) => void;
  hideToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType>({
  toastList: [],
  showToast: () => {},
  hideToast: () => {},
});

const TOAST_LIMIT = 3;

export default function ToastProvider({ children }: PropsWithChildren) {
  const [activeToastList, setActiveToastList] = useState<ToastType[]>([]);

  const showToastHandler = (toast: ToastParameters) => {
    const toastId = (new Date().getTime() + Math.random()).toString();
    setActiveToastList(prev => {
      if (prev.length >= TOAST_LIMIT) {
        prev.shift();
      }
      return [...prev, { ...toast, id: toastId }];
    });

    const timer = setTimeout(() => {
      hideToastHandler(toastId);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  };

  const hideToastHandler = (id: string) => {
    const toastEl = document.getElementById(id);
    if (toastEl) {
      toastEl.dataset.visibility = 'hidden';
      toastEl.addEventListener('animationend', () => {
        setActiveToastList(prev => prev.filter(toast => toast.id !== id));
      });
      return;
    }
    setActiveToastList(prev => prev.filter(toast => toast.id !== id));
  };

  const value = {
    toastList: activeToastList,
    showToast: showToastHandler,
    hideToast: hideToastHandler,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
