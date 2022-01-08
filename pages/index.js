import Banner from '../components/Banner/Banner';
import Layout from '../components/Layout';
import SectionCards from '../components/SectionCards/SectionCards';
import { getVideos } from '../lib/videos';

import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  const disneyVideos = await getVideos();

  return { props: { disneyVideos } };
}

export default function Home({ disneyVideos }) {
  return (
    <Layout>
      <Banner
        mainTitle="Clifford The Big Red Doge"
        subTitle="A Big Red Doge"
        imgUrl="/static/clifford.webp"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Travel" videos={disneyVideos} size="small" />
        <SectionCards
          title="Productivity"
          videos={disneyVideos}
          size="medium"
        />
        <SectionCards title="Popular" videos={disneyVideos} size="small" />
      </div>
    </Layout>
  );
}
