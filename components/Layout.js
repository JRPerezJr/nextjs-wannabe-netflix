import Head from 'next/head';
import Navbar from './Nav/Navbar';

import styles from '../styles/Home.module.css';
import Footer from './Footer/Footer';

const Layout = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} - Wannabe Netflix` : 'Wannabe Netflix'}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <div className={styles.main}>
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
