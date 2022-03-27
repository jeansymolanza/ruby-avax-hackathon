import React, {
  JSXElementConstructor,
  ReactChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { INft, INftCollection, NftMarketplace } from '../utils/nftConsts';
import SampleNftTradeAvax from '../data/sample_nfttrade_avax.json';
import SampleNftTradeBsc from '../data/sample_nfttrade_bsc.json';
import SampleGemEth from '../data/sample_gem_eth.json';
import DummyHoppersNft from '../data/dummy_hoppers_avax.json';

const NftProviderContext = React.createContext<any>({});

export const NftProvider = ({
  children,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
}) => {
  const [nfts] = useState<INft[] | null | undefined>();
  const [selectedNfts, setSelectedNfts] = useState<INft[] | null | undefined>();
  const [selectedNftsToPurchase, setSelectedNftsToPurchase] = useState<
    INft[] | null | undefined
  >();
  const [nftCollections, setNftCollections] = useState<
    INftCollection[] | null | undefined
  >();
  const [avaxUsdPrice, setAvaxUsdPrice] = useState<0>();
  const [ethUsdPrice, setEthUsdPrice] = useState<0>();
  const [bnbUsdPrice, setBnbUsdPrice] = useState<0>();
  const [tokenUsdPrice, setTokenUsdPrice] = useState<0>();

  const fetchTokenUsdPrice = useCallback(async () => {
    const tokenUsdPrice = await fetch(
      `https://api.covalenthq.com/v1/pricing/tickers/?quote-currency=USD&format=JSON&tickers=ETH,AVAX,BNB&key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`,
    );
    const tokenUsdPriceJson = await tokenUsdPrice.json();
    setTokenUsdPrice(tokenUsdPriceJson['data']['items']);
    setEthUsdPrice(tokenUsdPriceJson['data']['items'][0]['quote_rate']);
    setBnbUsdPrice(tokenUsdPriceJson['data']['items'][1]['quote_rate']);
    setAvaxUsdPrice(tokenUsdPriceJson['data']['items'][2]['quote_rate']);
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

  const fetchNftsByContractAddress = useCallback(async (contractAddress) => {
    const nfts = await fetchAllNfts();
    let selectedNfts: any = [];
    if (nfts) {
      selectedNfts = nfts.filter(function (nft) {
        return nft.contractAddress === contractAddress;
      });
    }
    setSelectedNfts(selectedNfts);
  }, []);

  const fetchAllNfts = async () => {
    const nfts = [];
    for (let i = 0; i < SampleNftTradeAvax.length; i++) {
      const nft: INft = {
        id: SampleNftTradeAvax[i].id,
        tokenId: SampleNftTradeAvax[i].tokenID,
        contractName: SampleNftTradeAvax[i].contractName,
        contractAddress: SampleNftTradeAvax[i].contractAddress,
        chainId: SampleNftTradeAvax[i].chainId,
        name: SampleNftTradeAvax[i].name,
        image: SampleNftTradeAvax[i].image,
        imageAlt: SampleNftTradeAvax[i].name,
        price: parseFloat(SampleNftTradeAvax[i].price).toFixed(
          2,
        ) as unknown as number,
        marketplace: NftMarketplace.NFTRADE,
      };
      nfts.push(nft);
    }
    for (let i = 0; i < SampleNftTradeBsc.length; i++) {
      const nft: INft = {
        id: SampleNftTradeBsc[i].id,
        tokenId: SampleNftTradeBsc[i].tokenID,
        contractName: SampleNftTradeBsc[i].contractName,
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
    for (let i = 0; i < SampleGemEth.length; i++) {
      const nft: INft = {
        id: SampleGemEth[i]._id,
        tokenId: SampleGemEth[i].id,
        contractName: SampleGemEth[i].collectionName,
        contractAddress: SampleGemEth[i].address,
        chainId: 1,
        name: SampleGemEth[i].name,
        image: SampleGemEth[i].imageUrl,
        imageAlt: SampleGemEth[i].name,
        price:
          (SampleGemEth[i].priceInfo.price as unknown as number) /
          Math.pow(10, 18),
        marketplace: SampleGemEth[i].marketplace,
      };
      nfts.push(nft);
    }
    return nfts;
  };

  const contextValue = useMemo(
    () => ({
      nfts,
      fetchAllNfts,
      nftCollections,
      fetchAllNftCollections,
      fetchNftsByContractAddress,
      selectedNfts,
      setSelectedNfts,
      selectedNftsToPurchase,
      setSelectedNftsToPurchase,
      avaxUsdPrice,
      bnbUsdPrice,
      ethUsdPrice,
      tokenUsdPrice,
      fetchTokenUsdPrice,
    }),
    [
      nfts,
      nftCollections,
      fetchAllNftCollections,
      fetchNftsByContractAddress,
      selectedNfts,
      setSelectedNfts,
      selectedNftsToPurchase,
      setSelectedNftsToPurchase,
      avaxUsdPrice,
      bnbUsdPrice,
      ethUsdPrice,
      tokenUsdPrice,
      fetchTokenUsdPrice,
    ],
  );

  return (
    <NftProviderContext.Provider value={contextValue}>
      {children}
    </NftProviderContext.Provider>
  );
};

export const useNftProvider = () => useContext(NftProviderContext);
