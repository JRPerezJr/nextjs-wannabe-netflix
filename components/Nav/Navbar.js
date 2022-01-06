import { useState } from 'react';

import Link from 'next/link';
import router from 'next/router';

import styles from './Navbar.module.css';

const Navbar = ({ username }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>Netflix</div>
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
              <p className={styles.username}>{username}</p>
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login">
                    <a className={styles.linkName}>Sign out</a>
                  </Link>
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
