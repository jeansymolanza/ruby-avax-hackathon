import type { NextPage } from 'next';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import seo from '../data/seo';

const Home: NextPage = () => {
  return (
    <Layout title={seo.title}>
      <Dashboard />
    </Layout>
  );
};

export default Home;
