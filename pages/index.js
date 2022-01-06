import Banner from '../components/Banner/Banner';
import Layout from '../components/Layout';
import SectionCards from '../components/SectionCards/SectionCards';

import styles from '../styles/Home.module.css';

export default function Home() {
  const disneyVideos = [
    {
      id: 0,
      imgUrl: '/static/clifford.webp',
    },
    {
      id: 1,
      imgUrl: '/static/clifford.webp',
    },
    {
      id: 2,
      imgUrl: '/static/clifford.webp',
    },
    {
      id: 3,
      imgUrl: '/static/clifford.webp',
    },
    {
      id: 4,
      imgUrl: '/static/clifford.webp',
    },
  ];
  return (
    <Layout>
      <Banner
        mainTitle="Clifford The Big Red Doge"
        subTitle="A Big Red Doge"
        imgUrl="/static/clifford.webp"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards
          title="Productivity"
          videos={disneyVideos}
          size="medium"
        />
      </div>
    </Layout>
  );
}
