import Banner from '../components/Banner/Banner';
import Layout from '../components/Layout';
import SectionCards from '../components/SectionCards/SectionCards';
import { verifyToken } from '../lib/utils';
import {
  getPopularVideos,
  getVideos,
  getWatchItAgainVideos,
} from '../lib/videos';

import styles from '../styles/Home.module.css';

export async function getServerSideProps(context) {
  const token = context.req ? context.req.cookies?.token : null;
  const userId = await verifyToken(token);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

  // query and etag
  const disneyVideos = await getVideos(
    'disney trailers',
    'vUtRQlIV0htg-1YJHA3aEotP7bk'
  );

  const productivityVideos = await getVideos(
    'productivity',
    'aM84q-WDz9MET0dEMlYEIE2CgFk'
  );

  const travelVideos = await getVideos('travel', 'iikVRIe9im4ZzXlqxzhtwCLgUcg');

  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      popularVideos,
      productivityVideos,
      travelVideos,
      watchItAgainVideos,
    },
  };
}

export default function Home({
  disneyVideos = [],
  popularVideos = [],
  productivityVideos = [],
  travelVideos = [],
  watchItAgainVideos = [],
}) {
  return (
    <Layout>
      <Banner
        videoId="4zH5iYM4wJo"
        mainTitle="Clifford The Big Red Doge"
        subTitle="A Big Red Doge"
        imgUrl="/static/clifford.webp"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards
          title="Watch It Again"
          videos={watchItAgainVideos}
          size="small"
        />
        <SectionCards title="Travel" videos={travelVideos} size="small" />
        <SectionCards
          title="Productivity"
          videos={productivityVideos}
          size="medium"
        />
        <SectionCards title="Popular" videos={popularVideos} size="small" />
      </div>
    </Layout>
  );
}
