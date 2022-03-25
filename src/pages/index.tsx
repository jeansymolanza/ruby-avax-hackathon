import type { NextPage } from 'next';
import Layout from '../components/Layout';
import seo from '../data/seo';

const Home: NextPage = () => {
  return <Layout title={seo.title}>test</Layout>;
};

export default Home;
