import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';
import { ReactElement, ReactNode, useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CookiesProvider } from 'react-cookie';

import '@/styles/reset.scss';
import RootLayout from '@/components/common/Layout/Root';
import ToastProvider from '@/components/common/Toast/Provider';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>포잉마켓</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider cookies={pageProps.cookies}>
          <ToastProvider>
            <HydrationBoundary state={pageProps.dehydratedState}>
              <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
              <ReactQueryDevtools initialIsOpen={false} />
            </HydrationBoundary>
          </ToastProvider>
        </CookiesProvider>
      </QueryClientProvider>
    </>
  );
}
