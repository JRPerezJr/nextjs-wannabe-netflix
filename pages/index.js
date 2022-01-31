import Banner from '../components/Banner/Banner';
import Layout from '../components/Layout';
import SectionCards from '../components/SectionCards/SectionCards';
import {
  getPopularVideos,
  getVideos,
  getWatchItAgainVideos,
} from '../lib/videos';

import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  const userId = 'did:ethr:0x9B5178e5C094f29faD1083e79d76765E48778F17';
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDlCNTE3OGU1QzA5NGYyOWZhRDEwODNlNzlkNzY3NjVFNDg3NzhGMTciLCJwdWJsaWNBZGRyZXNzIjoiMHg5QjUxNzhlNUMwOTRmMjlmYUQxMDgzZTc5ZDc2NzY1RTQ4Nzc4RjE3IiwiZW1haWwiOiJwcm9udDIzQGdtYWlsLmNvbSIsIm9hdXRoUHJvdmlkZXIiOm51bGwsInBob25lTnVtYmVyIjpudWxsLCJpYXQiOjE2NDM1OTEyNTgsImV4cCI6MTY0NDE5NjA1OCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImRpZDpldGhyOjB4OUI1MTc4ZTVDMDk0ZjI5ZmFEMTA4M2U3OWQ3Njc2NUU0ODc3OEYxNyJ9fQ.7qtSdsNKM7oXf8jjKqP3l94D4cNKBmtyqZsd0FRI-WQ';

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  console.log({ watchItAgainVideos });

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
    props: { disneyVideos, popularVideos, productivityVideos, travelVideos },
  };
}

export default function Home({
  disneyVideos = [],
  popularVideos = [],
  productivityVideos = [],
  travelVideos = [],
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
