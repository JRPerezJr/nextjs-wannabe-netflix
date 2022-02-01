import Head from 'next/head';
import Layout from '../../components/Layout';

import SectionCards from '../../components/SectionCards/SectionCards';
import { getMyVideoList } from '../../lib/videos';

import styles from '../../styles/MyList.module.css';
import redirectUser from '../../utils/redirectUser';

export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context);

  const myVideos = await getMyVideoList(userId, token);
  return {
    props: {
      myVideoList: myVideos,
    },
  };
}

const MyList = ({
  myVideoList,
  title = 'My Videos',
  description = 'My favorites video list',
}) => {
  return (
    <Layout title={title}>
      <Head>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <main className={styles.main}>
        <div className={styles.sectionWrapper}>
          <SectionCards
            title={title}
            videos={myVideoList}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </Layout>
  );
};

export default MyList;
