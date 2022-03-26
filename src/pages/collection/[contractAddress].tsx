import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import seo from '../../data/seo';
import Dashboard from '../../components/Dashboard';

const ContractAddress: NextPage = () => {
  return (
    <Layout title={seo.title}>
      <Dashboard />
    </Layout>
  );
};

export default ContractAddress;
