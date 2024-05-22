import { PropsWithChildren } from 'react';
import Header from './Header';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
