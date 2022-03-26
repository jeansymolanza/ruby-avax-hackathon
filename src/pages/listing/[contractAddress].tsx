import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import seo from '../../data/seo';
import { useRouter } from 'next/router';

const ContractAddress: NextPage = () => {
  const router = useRouter();
  const { contractAddress } = router.query;

  return <Layout title={seo.title}>{contractAddress}</Layout>;
};

export default ContractAddress;
