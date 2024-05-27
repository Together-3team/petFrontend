import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export default function ModalPortal({ children }: { children: ReactNode }) {
  const element = document.getElementById('rootModal');
  return !element ? null : ReactDOM.createPortal(children, element);
}
