import Head from 'next/head';
import Navbar from './Nav/Navbar';

const Layout = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} - Wannabe Netflix` : 'Wannabe Netflix'}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <Navbar username="james@jbond.com" />
      <main>{children}</main>
    </>
  );
};

export default Layout;
