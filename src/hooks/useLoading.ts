import { Router } from 'next/router';
import { useEffect, useState } from 'react';

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const start = () => {
      if (timer) {
        return;
      }
      timer = setTimeout(() => {
        setIsLoading(true);
      }, 200);
    };

    const end = () => {
      if (timer) {
        clearTimeout(timer);
      }
      setIsLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return { isLoading };
}
