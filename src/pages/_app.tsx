import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'wagmi';
import { connectors } from '../utils/walletHelper';
import { WalletProvider } from '../contexts/WalletProviderContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider connectors={connectors}>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </Provider>
  );
}

export default MyApp;
