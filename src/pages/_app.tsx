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
import useLoading from '@/hooks/useLoading';
import Loading from '@/components/common/Loading';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  const { isLoading } = useLoading();
  const [queryClient] = useState(() => new QueryClient());

  if (isLoading) {
    return (
      <RootLayout>
        <Loading />
      </RootLayout>
    );
  }

  return (
    <>
      <Head>
        <title>포잉마켓</title>
      </Head>
      <CookiesProvider cookies={pageProps.cookies}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <HydrationBoundary state={pageProps.dehydratedState}>
              <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
              <ReactQueryDevtools initialIsOpen={false} />
            </HydrationBoundary>
          </ToastProvider>
        </QueryClientProvider>
      </CookiesProvider>
    </>
  );
}
