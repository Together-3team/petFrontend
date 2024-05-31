import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';
import { ReactElement, ReactNode, useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FormProvider, useForm } from 'react-hook-form';

import '@/styles/reset.scss';
import RootLayout from '@/components/common/Layout/Root';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  const [queryClient] = useState(() => new QueryClient());
  const methods = useForm();

  return (
    <>
      <Head>
        <title>포잉마켓</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <FormProvider {...methods}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
            <ReactQueryDevtools initialIsOpen={false} />
          </HydrationBoundary>
        </FormProvider>
      </QueryClientProvider>
    </>
  );
}
