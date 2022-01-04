import Banner from '../components/Banner/Banner';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <h1>Netflix</h1>
      <Banner
        mainTitle="Clifford The Big Red Doge"
        subTitle="A Big Red Doge"
        imgUrl="/static/clifford.webp"
      />
    </Layout>
  );
}
