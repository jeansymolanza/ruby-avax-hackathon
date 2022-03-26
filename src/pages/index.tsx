import type { NextPage } from 'next';
import Layout from '../components/Layout';
import seo from '../data/seo';
import Summary from '../components/Summary';

const Home: NextPage = () => {
  return (
    <Layout title={seo.title}>
      <Summary />
    </Layout>
  );
};

export default Home;
