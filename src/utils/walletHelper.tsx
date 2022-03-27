import { chain, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

export const chains = defaultChains;

export const connectors = ({ chainId }: { chainId?: number | undefined }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletLinkConnector({
      options: {
        appName: 'Ruby',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

export const AVAX_DEV_CHAIN_ID = 43113;
export const AVAX_DEV_CHAIN_URL = 'https://api.avax-test.network/ext/bc/C/rpc';
export const RUBY_CONTRACT_ADDRESS =
  '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
