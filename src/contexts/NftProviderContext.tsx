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
import { INft, INftCollection, NftMarketplace } from '../utils/nftConsts';
import { useConnect } from 'wagmi';
import SampleNftTradeAvax from '../data/sample_nfttrade_avax.json';
import SampleNftTradeBsc from '../data/sample_nfttrade_bsc.json';
import SampleGemEth from '../data/sample_gem_eth.json';
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
  const [nftCollections, setNftCollections] = useState<
    INftCollection[] | null | undefined
  >();
  const [avaxUsdPrice, setAvaxUsdPrice] = useState<0>();
  const [{ data: connectData }] = useConnect();

  const fetchAvaxUsdPrice = useCallback(async () => {
    const avaxUsdPrice = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd',
    );
    const avaxUsdPriceJson = await avaxUsdPrice.json();
    setAvaxUsdPrice(avaxUsdPriceJson['avalanche-2']['usd']);
  }, []);

  const fetchAllNftCollections = useCallback(async () => {
    const nftCollections = [];

    const sampleNftTradeAvaxMetadata = await fetch(
      `${process.env.NEXT_PUBLIC_COVALENT_AVAX_MARKET_API_URL}/${SampleNftTradeAvax[0].contractAddress}/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`,
    );
    const sampleNftTradeAvaxMetadataJson =
      await sampleNftTradeAvaxMetadata.json();
    nftCollections.push({
      image:
        SampleNftTradeAvax[
          Math.floor(Math.random() * SampleNftTradeAvax.length)
        ].image,
      contractAddress: SampleNftTradeAvax[0].contractAddress,
      name: SampleNftTradeAvax[0].contractName,
      chainId: SampleNftTradeAvax[0].chainId,
      floor: sampleNftTradeAvaxMetadataJson.data.items[0].floor_price_quote_7d,
      lastDaySales:
        sampleNftTradeAvaxMetadataJson.data.items[0]
          .unique_token_ids_sold_count_day,
      lastDayVolume:
        sampleNftTradeAvaxMetadataJson.data.items[0].volume_quote_day,
    } as INftCollection);

    const sampleNftTradeBscMetadata = await fetch(
      `${process.env.NEXT_PUBLIC_COVALENT_BSC_MARKET_API_URL}/${SampleNftTradeBsc[0].contractAddress}/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`,
    );
    const sampleNftTradeBscMetadataJson =
      await sampleNftTradeBscMetadata.json();
    nftCollections.push({
      image:
        SampleNftTradeBsc[Math.floor(Math.random() * SampleNftTradeBsc.length)]
          .image,
      contractAddress: SampleNftTradeBsc[0].contractAddress,
      name: SampleNftTradeBsc[0].contractName,
      chainId: SampleNftTradeBsc[0].chainId,
      floor: sampleNftTradeBscMetadataJson.data.items[0].floor_price_quote_7d,
      lastDaySales:
        sampleNftTradeBscMetadataJson.data.items[0]
          .unique_token_ids_sold_count_day,
      lastDayVolume:
        sampleNftTradeBscMetadataJson.data.items[0].volume_quote_day,
    } as INftCollection);

    const sampleGemEthMetadata = await fetch(
      `${process.env.NEXT_PUBLIC_COVALENT_ETH_MARKET_API_URL}/${SampleGemEth[0].address}/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`,
    );
    const sampleGemEthMetadataJson = await sampleGemEthMetadata.json();
    nftCollections.push({
      image:
        SampleGemEth[Math.floor(Math.random() * SampleNftTradeBsc.length)]
          .imageUrl,
      contractAddress: SampleGemEth[0].address,
      name: SampleGemEth[0].collectionName,
      chainId: 1,
      floor: sampleGemEthMetadataJson.data.items[0].floor_price_quote_7d,
      lastDaySales:
        sampleGemEthMetadataJson.data.items[0].unique_token_ids_sold_count_day,
      lastDayVolume: sampleGemEthMetadataJson.data.items[0].volume_quote_day,
    } as INftCollection);

    setNftCollections(nftCollections);
  }, []);

  const fetchAllNfts = useCallback(async () => {
    const nfts = [];
    for (let i = 0; i < SampleNftTradeAvax.length; i++) {
      const nft: INft = {
        id: SampleNftTradeAvax[i].id,
        tokenId: SampleNftTradeAvax[i].tokenID,
        contractAddress: SampleNftTradeAvax[i].contractAddress,
        chainId: SampleNftTradeAvax[i].chainId,
        name: SampleNftTradeAvax[i].name,
        image: SampleNftTradeAvax[i].image,
        imageAlt: SampleNftTradeAvax[i].name,
        price: SampleNftTradeAvax[i].price as unknown as number,
        marketplace: NftMarketplace.NFTRADE,
      };
      nfts.push(nft);
    }
    for (let i = 0; i < SampleNftTradeBsc.length; i++) {
      const nft: INft = {
        id: SampleNftTradeBsc[i].id,
        tokenId: SampleNftTradeBsc[i].tokenID,
        contractAddress: SampleNftTradeBsc[i].contractAddress,
        chainId: SampleNftTradeAvax[i].chainId,
        name: SampleNftTradeBsc[i].name,
        image: SampleNftTradeBsc[i].image,
        imageAlt: SampleNftTradeBsc[i].name,
        price: SampleNftTradeBsc[i].price as unknown as number,
        marketplace: NftMarketplace.NFTRADE,
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
    fetchAllNfts().then();
  }, [connectData.connected, fetchAllNfts]);

  const contextValue = useMemo(
    () => ({
      nfts,
      fetchAllNfts,
      nftCollections,
      fetchAllNftCollections,
      avaxUsdPrice,
      fetchAvaxUsdPrice,
    }),
    [
      nfts,
      nftCollections,
      fetchAllNftCollections,
      avaxUsdPrice,
      fetchAvaxUsdPrice,
    ],
  );

  return (
    <NftProviderContext.Provider value={contextValue}>
      {children}
    </NftProviderContext.Provider>
  );
};

export const useNftProvider = () => useContext(NftProviderContext);
