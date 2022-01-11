import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { magic } from '../../lib/magic-client';

import styles from './Navbar.module.css';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  useEffect(async () => {
    try {
      const { email } = await magic.user.getMetadata();
      if (email) {
        setUserName(email);
      }
    } catch (error) {
      console.log('Error fetching email', error);
    }
  }, []);

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await magic.user.logout();

      await magic.user.isLoggedIn();
      router.push('/login');
    } catch (error) {
      console.log('Error fetching email', error);
      router.push('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={() => router.push('/')}>
            Home
          </li>
          <li
            className={styles.navItem2}
            onClick={() => router.push('/browse/my-list')}
          >
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <p className={styles.username}>{userName}</p>
              <Image
                src={'/static/expand_icon.svg'}
                alt="expand dropdown"
                width="24px"
                height="24px"
              />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Sign out
                  </a>

                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
