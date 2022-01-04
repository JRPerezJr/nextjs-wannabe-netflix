import Head from 'next/head';

const Layout = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} - Wannabe Netflix` : 'Wannabe Netflix'}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
