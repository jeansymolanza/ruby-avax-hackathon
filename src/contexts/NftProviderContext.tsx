import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { INft } from '../utils/nftConsts';
import { useConnect } from 'wagmi';
import SampleNftTrade from '../data/sample_nfttrade.json';
import ConsoleHelper from '../utils/consoleHelper';

const NftProviderContext = React.createContext<any>({});

export const NftProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [nfts, setNfts] = useState<INft[] | null | undefined>();
  const [{ data: connectData }] = useConnect();

  const fetchNfts = useCallback(async () => {
    const nfts = [];
    for (let i = 0; i < SampleNftTrade.length; i++) {
      const nft: INft = {
        name: SampleNftTrade[i].name,
        image: SampleNftTrade[i].image,
      };
      nfts.push(nft);
    }
    ConsoleHelper(nfts);
    setNfts(nfts);
  }, []);

  useEffect(() => {
    if (!connectData.connected) {
      return;
    }
    fetchNfts().then();
  }, [connectData.connected, fetchNfts]);

  const contextValue = useMemo(
    () => ({
      nfts,
    }),
    [nfts],
  );

  return (
    <NftProviderContext.Provider value={contextValue}>
      {children}
    </NftProviderContext.Provider>
  );
};

export const useNftProvider = () => useContext(NftProviderContext);
