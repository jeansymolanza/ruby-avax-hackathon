import { useNftProvider } from '../contexts/NftProviderContext';
import { INft, NftMarketplace } from '../utils/nftConsts';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ConsoleHelper from '../utils/consoleHelper';

export default function Listing() {
  const router = useRouter();
  const { contractAddress } = router.query;
  const {
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

  useEffect(() => {
    if (contractAddress) {
      fetchNftsByContractAddress(contractAddress);
    }
  }, [contractAddress]);

  useEffect(() => {
    if (!tokenUsdPrice) {
      fetchTokenUsdPrice();
    }
  }, [tokenUsdPrice]);

  function nftBeenSelectedForPurchase(nftToAdd: INft, selectedNfts: INft[]) {
    return selectedNfts.some(function (selectedNft) {
      return nftToAdd.id === selectedNft.id;
    });
  }

  return (
    <div>
      {selectedNfts && (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 pb-6">
          {selectedNfts.map((selectedNft: INft) => (
            <div className="group relative" key={selectedNft.id}>
              <div
                className="w-full min-h-80 flex flex-col relative aspect-square overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none cursor-pointer"
                onClick={() => {
                  let newSelectedNftsToPurchase = Object.assign(
                    [],
                    selectedNftsToPurchase,
                  ) as INft[];
                  if (
                    !nftBeenSelectedForPurchase(
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
                  ConsoleHelper(newSelectedNftsToPurchase);
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
                  <div># 7447</div>
                </span>
              </div>
              <div className="border-2 border-gray-100 -mt-6 pt-8 pb-3 px-3 rounded-xl text-sm">
                <div className="font-bold">{selectedNft.name}</div>
                <div className="flex items-center max-w-full">
                  {selectedNft.chainId === 1 && (
                    <div className="text-gray-400 pt-2">
                      {(
                        (selectedNft.price * ethUsdPrice) /
                        avaxUsdPrice
                      ).toFixed(2)}
                    </div>
                  )}
                  {selectedNft.chainId === 56 && (
                    <div className="text-gray-400 pt-2">
                      {(
                        (selectedNft.price * bnbUsdPrice) /
                        avaxUsdPrice
                      ).toFixed(2)}
                    </div>
                  )}
                  {selectedNft.chainId === 43114 && (
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
  );
}
