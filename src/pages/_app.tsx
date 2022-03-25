import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'wagmi';
import { connectors } from '../utils/walletHelper';
import { WalletProvider } from '../contexts/WalletProviderContext';
import { NftProvider } from '../contexts/NftProviderContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider connectors={connectors}>
      <WalletProvider>
        <NftProvider>
          <Component {...pageProps} />
        </NftProvider>
      </WalletProvider>
    </Provider>
  );
}

export default MyApp;
