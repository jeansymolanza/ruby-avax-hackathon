import { useNftProvider } from '../contexts/NftProviderContext';
import {
  INft,
  INftCollection,
  NftChainId,
  NftMarketplace,
} from '../utils/nftConsts';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Listing() {
  const router = useRouter();
  const { contractAddress } = router.query;
  const {
    nftCollections,
    fetchAllNftCollections,
    fetchNftsByContractAddress,
    selectedNfts,
    avaxUsdPrice,
    ethUsdPrice,
    bnbUsdPrice,
    tokenUsdPrice,
    fetchTokenUsdPrice,
    selectedNftsToPurchase,
    setSelectedNftsToPurchase,
  } = useNftProvider();
  const [nftCollection, setNftCollection] = useState<
    INftCollection | null | undefined
  >();

  useEffect(() => {
    if (contractAddress) {
      fetchNftsByContractAddress(contractAddress);
    }
  }, [contractAddress]);

  useEffect(() => {
    if (!nftCollections) {
      fetchAllNftCollections();
    }
  }, [nftCollections]);

  useEffect(() => {
    if (!nftCollection && nftCollections && contractAddress) {
      const nftCollection = nftCollections.filter(function (
        nftCollection: INftCollection,
      ) {
        return nftCollection.contractAddress === contractAddress;
      });
      if (nftCollection && nftCollection[0]) {
        setNftCollection(nftCollection[0]);
      }
    }
  }, [nftCollections, contractAddress]);

  useEffect(() => {
    if (!tokenUsdPrice) {
      fetchTokenUsdPrice();
    }
  }, [tokenUsdPrice]);

  function nftHasBeenSelectedForPurchase(nftToAdd: INft, selectedNfts: INft[]) {
    return selectedNfts.some(function (selectedNft) {
      return nftToAdd.id === selectedNft.id;
    });
  }

  return (
    <div>
      <div className="w-full flex flex-col items-start flex-1">
        {nftCollection && (
          <div className="sticky flex mb-4 flex-col bg-white py-4 w-full bg-white z-10 md:top-0 -mt-8">
            <div className="flex flex-col md:flex-row items-start lg:items-center gap-2 justify-between">
              <div className="flex flex-col">
                <div className="flex items-center flex-shrink-1 truncate">
                  <div className="truncate text-2xl font-circularstdbold text-gray-700 text-left">
                    {nftCollection && nftCollection.name}
                  </div>
                </div>
                <div className="flex my-2 h-4 md:mb-0 text-xs  font-circularstdbook">
                  <div className="flex">
                    <span className="font-medium text-gray-500">
                      Floor:{' '}
                      {nftCollection &&
                        (nftCollection.floor / avaxUsdPrice).toFixed(2)}
                    </span>
                    <img
                      src="https://nftrade.com/img/chains/currency/avaxCurrency.svg"
                      className="ml-1"
                      style={{ height: '14px', width: '14px' }}
                      alt="avax currency"
                    />
                  </div>
                  <div className="mx-2 border border-gray-300" />
                  <div className="flex">
                    <span className="font-medium text-gray-500">
                      24h Sales: {nftCollection && nftCollection.lastDaySales}
                    </span>
                  </div>
                  <div className="mx-2 border border-gray-300" />
                  <div className="flex">
                    <span className="font-medium text-gray-500">
                      24h Volume:{' '}
                      {nftCollection &&
                        (nftCollection.lastDayVolume / avaxUsdPrice).toFixed(2)}
                    </span>
                    <img
                      src="https://nftrade.com/img/chains/currency/avaxCurrency.svg"
                      className="ml-1"
                      style={{ height: '14px', width: '14px' }}
                      alt="avax currency"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedNfts && (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 pb-6">
            {selectedNfts.map((selectedNft: INft) => (
              <div className="group relative" key={selectedNft.id}>
                <div
                  className={
                    !nftHasBeenSelectedForPurchase(
                      selectedNft,
                      selectedNftsToPurchase,
                    )
                      ? 'w-full min-h-80 flex flex-col relative aspect-square overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none cursor-pointer'
                      : 'w-full min-h-80 flex flex-col relative aspect-square overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none cursor-pointer bg-blue-100'
                  }
                  onClick={() => {
                    let newSelectedNftsToPurchase = Object.assign(
                      [],
                      selectedNftsToPurchase,
                    ) as INft[];
                    if (
                      !nftHasBeenSelectedForPurchase(
                        selectedNft,
                        newSelectedNftsToPurchase,
                      )
                    ) {
                      newSelectedNftsToPurchase.push(selectedNft);
                    } else {
                      newSelectedNftsToPurchase =
                        newSelectedNftsToPurchase.filter(function (
                          nftsSelectedForPurchase,
                        ) {
                          return nftsSelectedForPurchase.id !== selectedNft.id;
                        });
                    }
                    setSelectedNftsToPurchase(newSelectedNftsToPurchase);
                  }}
                >
                  <Image
                    src={selectedNft.image}
                    alt={selectedNft.imageAlt}
                    layout="fill"
                    className="w-full h-full object-center object-cover rounded-xl"
                  />
                  <a
                    target="_blank"
                    rel="_ noreferrer"
                    className="absolute left-3 top-3 w-6 h-6"
                  >
                    {selectedNft.marketplace === NftMarketplace.OPENSEA && (
                      <img
                        className="rounded-full"
                        alt={selectedNft.marketplace}
                        src="https://www.gem.xyz/assets/opensea.1f851ea3.svg"
                      />
                    )}
                    {selectedNft.marketplace === NftMarketplace.LOOKSRARE && (
                      <img
                        className="rounded-full"
                        alt={selectedNft.marketplace}
                        src="https://www.gem.xyz/assets/looksrare.11c5dbea.svg"
                      />
                    )}
                    {selectedNft.marketplace === NftMarketplace.X2Y2 && (
                      <img
                        className="rounded-full"
                        alt={selectedNft.marketplace}
                        src="https://www.gem.xyz/assets/x2y2.c7bc83e8.svg"
                      />
                    )}
                    {selectedNft.marketplace === NftMarketplace.NFTRADE && (
                      <img
                        className="rounded-full"
                        alt={selectedNft.marketplace}
                        src="https://pbs.twimg.com/profile_images/1386957578140332032/5-CRjiJc_400x400.jpg"
                      />
                    )}
                  </a>
                  <div className="absolute right-3 top-3 w-6 h-6 flex items-center justify-center group-hover:opacity-100 duration-200 transition opacity-0">
                    <div className="absolute opacity-20 rounded-full w-full h-full left-0 top-0 bg-white" />
                    <img
                      className="w-3 h-3"
                      alt="plus"
                      src="https://www.gem.xyz/assets/plus.b871573e.svg"
                    />
                  </div>
                  <span className="border-2 border-white rounded-md absolute left-3 bottom-3 bg-white text-black h-6 px-2 font-bold text-xs flex items-center justify-center">
                    <div>{selectedNft.tokenId}</div>
                  </span>
                </div>
                <div
                  className={
                    !nftHasBeenSelectedForPurchase(
                      selectedNft,
                      selectedNftsToPurchase,
                    )
                      ? 'border-2 border-gray-100 -mt-6 pt-8 pb-3 px-3 rounded-xl text-sm'
                      : 'border-2 border-gray-100 -mt-6 pt-8 pb-3 px-3 rounded-xl text-sm bg-blue-50'
                  }
                >
                  <div className="font-bold">{selectedNft.name}</div>
                  <div className="flex items-center max-w-full">
                    {selectedNft.chainId === NftChainId.ETHEREUM && (
                      <div className="text-gray-400 pt-2">
                        {(
                          (selectedNft.price * ethUsdPrice) /
                          avaxUsdPrice
                        ).toFixed(2)}
                      </div>
                    )}
                    {selectedNft.chainId === NftChainId.BINANCE_SMART_CHAIN && (
                      <div className="text-gray-400 pt-2">
                        {(
                          (selectedNft.price * bnbUsdPrice) /
                          avaxUsdPrice
                        ).toFixed(2)}
                      </div>
                    )}
                    {selectedNft.chainId === NftChainId.AVALANCHE && (
                      <div className="text-gray-400 pt-2">
                        {parseFloat(
                          selectedNft.price as unknown as string,
                        ).toFixed(2)}
                      </div>
                    )}
                    <img
                      src="https://nftrade.com/img/chains/currency/avaxCurrency.svg"
                      className="ml-2 mt-2"
                      style={{ height: '16px', width: '16px' }}
                      alt="avax currency"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
