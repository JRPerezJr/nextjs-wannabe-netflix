import Banner from '../components/Banner/Banner';
import Layout from '../components/Layout';
import SectionCards from '../components/SectionCards/SectionCards';
import { getPopularVideos, getVideos } from '../lib/videos';

import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  const disneyVideos = await getVideos('disney trailers');

  const productivityVideos = await getVideos('productivity');

  const travelVideos = await getVideos('travel');

  const popularVideos = await getPopularVideos();

  return {
    props: { disneyVideos, popularVideos, productivityVideos, travelVideos },
  };
}

export default function Home({
  disneyVideos,
  popularVideos,
  productivityVideos,
  travelVideos,
}) {
  return (
    <Layout>
      <Banner
        mainTitle="Clifford The Big Red Doge"
        subTitle="A Big Red Doge"
        imgUrl="/static/clifford.webp"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
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
