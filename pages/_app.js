import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import '../styles/globals.css';

import AppLoader from '../components/Loader/Loader';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return isLoading ? <AppLoader /> : <Component {...pageProps} />;
}

export default MyApp;
