import Banner from '../components/Banner/Banner';
import Card from '../components/Card/Card';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Banner
        mainTitle="Clifford The Big Red Doge"
        subTitle="A Big Red Doge"
        imgUrl="/static/clifford.webp"
      />
      <Card imgUrl="/static/clifford.webp" size="large" />
      <Card imgUrl="/static/clifford.webp" size="medium" />
      <Card imgUrl="/static/clifford.webp" size="small" />
    </Layout>
  );
}
