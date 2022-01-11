import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import validator from 'validator';

import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleOnChangeEmail = (e) => {
    setEmailError('');
    const email = e.target.value;
    if (validator.isEmail(email)) {
      setEmail(email);
    }
  };

  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    if (email) {
      if (email === 'jbond@007.com') {
        router.push('/');
      } else {
        setEmailError('Invalid email');
      }
    } else {
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
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
