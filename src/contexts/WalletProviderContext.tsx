import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useAccount, useConnect, useNetwork } from 'wagmi';

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
