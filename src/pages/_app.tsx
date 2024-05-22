import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';

import '@/styles/reset.scss';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <>
      <Head>
        <title>3 team</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
