import { PropsWithChildren } from 'react';
import MainHeader from './Header';
import MainFooter from './Footer';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MainHeader />
      {children}
      <MainFooter />
    </>
  );
}
