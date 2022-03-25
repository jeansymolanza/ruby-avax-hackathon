import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAccount, useConnect, useNetwork } from 'wagmi';
import { AVAX_DEV_CHAIN_ID } from '../utils/walletHelper';

const WalletProviderContext = React.createContext<any>({});

export const WalletProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [{ data: connectData }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount();
  const [{ data: networkData }, switchNetwork] = useNetwork();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!connectData.connected) {
      return;
    }
    if (
      switchNetwork &&
      networkData &&
      networkData.chain &&
      networkData.chain.id != AVAX_DEV_CHAIN_ID
    ) {
      switchNetwork(AVAX_DEV_CHAIN_ID).then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectData.connected]);

  const contextValue = useMemo(
    () => ({
      connectData,
      accountData,
      connect,
      disconnect,
      networkData,
      switchNetwork,
      message,
      setMessage,
    }),
    [
      connectData,
      accountData,
      connect,
      disconnect,
      networkData,
      switchNetwork,
      message,
      setMessage,
    ],
  );

  return (
    <WalletProviderContext.Provider value={contextValue}>
      {children}
    </WalletProviderContext.Provider>
  );
};

export const useWalletProvider = () => useContext(WalletProviderContext);
