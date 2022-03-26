import { useNftProvider } from '../contexts/NftProviderContext';
import { useEffect } from 'react';
import { INftCollection } from '../utils/nftConsts';

export default function Summary() {
  const {
    nftCollections,
    fetchAllNftCollections,
    avaxUsdPrice,
    fetchAvaxUsdPrice,
  } = useNftProvider();

  useEffect(() => {
    if (!nftCollections) {
      fetchAllNftCollections();
    }
    if (!avaxUsdPrice) {
      fetchAvaxUsdPrice();
    }
  });

  return (
    <div className="h-full pt-12">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-4xl font-circularstdbold text-gray-900">
              The NFT marketplace aggregator for the AVAX ecosystem
            </h1>
            <p className="mt-2 text-xl text-md text-gray-500 font-circularstdbook">
              Discover, buy, and sell NFTs across all marketplaces and chains.
            </p>
          </div>
        </div>
        {nftCollections && (
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-circularstdbold text-gray-900 sm:pl-6 font-"
                        >
                          Collection
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-circularstdbold text-gray-900"
                        >
                          Chain
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-circularstdbold text-gray-900"
                        >
                          Contract Address
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-circularstdbold text-gray-900"
                        >
                          Floor
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-circularstdbold text-gray-900"
                        >
                          24h Sales
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-circularstdbold text-gray-900"
                        >
                          24h Volume
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {nftCollections.map((nftCollection: INftCollection) => (
                        <tr
                          key={nftCollection.contractAddress}
                          className="hover:bg-gray-50 cursor-pointer"
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={nftCollection.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-circularstdbold text-gray-900 flex items-center max-w-full">
                                  {nftCollection.name}
                                  <img
                                    src="https://www.genie.xyz/svgs/verifiedBadge.svg"
                                    className="ml-1"
                                    style={{ height: '16px', width: '16px' }}
                                    alt="verified badge"
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {nftCollection.chainId == 43114 && (
                              <>
                                <img
                                  src="https://nftrade.com/img/chains/currency/avaxCurrency.svg"
                                  style={{ height: '16px', width: '16px' }}
                                  alt="avax currency"
                                />
                              </>
                            )}
                            {nftCollection.chainId == 56 && (
                              <>
                                <img
                                  src="https://nftrade.com/img/chains/currency/bnbCurrency.svg"
                                  style={{ height: '16px', width: '16px' }}
                                  alt="bsc currency"
                                />
                              </>
                            )}
                            {nftCollection.chainId == 1 && (
                              <>
                                <img
                                  src="https://nftrade.com/img/chains/currency/ethCurrency.svg"
                                  style={{ height: '16px', width: '16px' }}
                                  alt="eth currency"
                                />
                              </>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-circularstdbook">
                            {nftCollection.contractAddress}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-circularstdbook">
                            <div className="flex items-center max-w-full">
                              {(nftCollection.floor / avaxUsdPrice).toFixed(2)}
                              <img
                                src="https://nftrade.com/img/chains/currency/avaxCurrency.svg"
                                className="ml-2"
                                style={{ height: '16px', width: '16px' }}
                                alt="avax currency"
                              />
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-circularstdbook">
                            {nftCollection.lastDaySales}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-circularstdbook">
                            <div className="flex items-center max-w-full">
                              {(
                                nftCollection.lastDayVolume / avaxUsdPrice
                              ).toFixed(2)}
                              <img
                                src="https://nftrade.com/img/chains/currency/avaxCurrency.svg"
                                className="ml-2"
                                style={{ height: '16px', width: '16px' }}
                                alt="avax currency"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
