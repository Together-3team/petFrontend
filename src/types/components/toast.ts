import { LinkProps } from 'next/link';

export type ToastStatus = 'success' | 'warn' | 'error';

export interface ToastParameters {
  status: ToastStatus;
  message: string;
  linkMessage?: string;
  linkProps?: LinkProps;
}

export interface ToastType extends ToastParameters {
  id: string;
}
