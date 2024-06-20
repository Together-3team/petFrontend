import { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';

import { ToastType, ToastParameters } from '@/types/components/toast';
import Portal from '@/components/common/Portal';
import ToastList from '@/components/common/Toast';
import { PORTAL_ID } from '@/constants/portal';

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
const TOAST_DURATION = 3 * 1000;

export default function ToastProvider({ children }: PropsWithChildren) {
  const [activeToastList, setActiveToastList] = useState<ToastType[]>([]);
  const [portalId, setPortalId] = useState<string>(PORTAL_ID.TOAST);

  const hideToastHandler = useCallback((id: string) => {
    const toastEl = document.getElementById(id);
    if (toastEl) {
      toastEl.dataset.visibility = 'hidden';
      toastEl.addEventListener('animationend', () => {
        setActiveToastList(prev => prev.filter(toast => toast.id !== id));
      });
      return;
    }
    setActiveToastList(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToastHandler = useCallback(
    (toast: ToastParameters) => {
      const toastId = (new Date().getTime() + Math.random()).toString();
      setActiveToastList(prev => {
        if (prev.length >= TOAST_LIMIT) {
          prev.shift();
        }
        return [...prev, { ...toast, id: toastId }];
      });

      const timer = setTimeout(() => {
        hideToastHandler(toastId);
      }, TOAST_DURATION);

      return () => {
        clearTimeout(timer);
      };
    },
    [hideToastHandler]
  );

  const setPortalIdHandler = useCallback((id: string = PORTAL_ID.TOAST) => {
    setPortalId(id);
  }, []);

  const value = {
    toastList: activeToastList,
    showToast: showToastHandler,
    hideToast: hideToastHandler,
    setPortalId: setPortalIdHandler,
  };

  useEffect(() => {
    if (!activeToastList.length) {
      return;
    }

    const timer = setTimeout(() => {
      setActiveToastList([]);
    }, TOAST_DURATION + 500);

    return () => clearTimeout(timer);
  }, [activeToastList]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Portal id={portalId}>
        <ToastList items={activeToastList} />
      </Portal>
    </ToastContext.Provider>
  );
}
