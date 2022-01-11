import { useEffect, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import validator from 'validator';

import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';
import { magic } from '../lib/magic-client';

const LoginPage = () => {
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

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChangeEmail = (e) => {
    setEmailError('');
    const email = e.target.value;
    if (validator.isEmail(email)) {
      setEmail(email);
    }
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      if (email === 'pront23@gmail.com') {
        // log in a user by their email
        try {
          setIsLoading(true);
          const didToken = await magic.auth.loginWithMagicLink({ email });
          console.log({ didToken });

          if (didToken) {
            router.push('/');
          }
        } catch {
          // Handle errors if required!
          console.log('Something went wrong logging in');
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setEmailError('Invalid email');
      }
    } else {
      setIsLoading(false);
      setEmail('');
      setEmailError('Enter a valid email address!');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title> SignIn - Wannabe Netflix</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src={'/static/netflix.svg'}
                alt="netflix logo"
                width="128px"
                height="34px"
              />
            </div>
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signInHeader}>Sign In</h1>
          <input
            className={styles.emailInput}
            type="text"
            placeholder="Email address"
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{emailError}</p>
          <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
