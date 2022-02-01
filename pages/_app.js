import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { magic } from '../lib/magic-client';

import '../styles/globals.css';
import AppLoader from '../components/Loader/Loader';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  // if logged in
  // route to /
  // else
  // route to /login

  useEffect(
    () => {
      const confirmLogin = async () => {
        const isLoggedIn = await magic.user.isLoggedIn();

        if (isLoggedIn) {
          router.push('/');
        } else {
          router.push('/login');
        }
      };
      confirmLogin();
    },
    [] // eslint-disable-line
  );

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
