import { PropsWithChildren, createContext, useState } from 'react';

import { ToastType, ToastParameters } from '@/types/components/toast';
import Portal from '@/components/common/Portal';
import ToastList from '@/components/common/Toast';

interface ToastContextType {
  toastList: ToastType[];
  showToast: (toast: ToastParameters) => void;
  hideToast: (id: string) => void;
  setPortalId: (id?: string) => void;
}

export const ToastContext = createContext<ToastContextType>({
  toastList: [],
  showToast: () => {},
  hideToast: () => {},
  setPortalId: () => {},
});

const TOAST_LIMIT = 3;
const INITIAL_PORTAL_ID = 'rootToast';

export default function ToastProvider({ children }: PropsWithChildren) {
  const [activeToastList, setActiveToastList] = useState<ToastType[]>([]);
  const [portalId, setPortalId] = useState(INITIAL_PORTAL_ID);

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

  const setPortalIdHandler = (id: string = INITIAL_PORTAL_ID) => {
    setPortalId(id);
  };

  const value = {
    toastList: activeToastList,
    showToast: showToastHandler,
    hideToast: hideToastHandler,
    setPortalId: setPortalIdHandler,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Portal id={portalId}>
        <ToastList items={activeToastList} />
      </Portal>
    </ToastContext.Provider>
  );
}
