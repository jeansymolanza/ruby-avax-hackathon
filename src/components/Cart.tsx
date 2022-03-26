import { useNftProvider } from '../contexts/NftProviderContext';
import { useEffect, useState } from 'react';
import { INft } from '../utils/nftConsts';

export default function Cart() {
  const {
    selectedNftsToPurchase,
    setSelectedNftsToPurchase,
    avaxUsdPrice,
    ethUsdPrice,
    bnbUsdPrice,
  } = useNftProvider();
  const [
    selectedNftsToPurchaseAvaxTotalAmount,
    setSelectedNftsToPurchaseAvaxTotalAmount,
  ] = useState(0);
  const [
    selectedNftsToPurchaseUsdTotalAmount,
    setSelectedNftsToPurchaseUsdTotalAmount,
  ] = useState(0);

  useEffect(() => {
    if (!selectedNftsToPurchase) {
      setSelectedNftsToPurchase([]);
    }
  }, [selectedNftsToPurchase]);

  useEffect(() => {
    if (selectedNftsToPurchase && selectedNftsToPurchase.length > 0) {
      let selectedNftsToPurchaseAvaxTotalAmount = 0;
      let selectedNftsToPurchaseUsdTotalAmount = 0;
      for (let i = 0; i < selectedNftsToPurchase.length; i++) {
        if (selectedNftsToPurchase[i].chainId === 1) {
          selectedNftsToPurchaseAvaxTotalAmount =
            selectedNftsToPurchaseAvaxTotalAmount +
            (selectedNftsToPurchase[i].price * ethUsdPrice) / avaxUsdPrice;
          selectedNftsToPurchaseUsdTotalAmount =
            selectedNftsToPurchaseUsdTotalAmount +
            selectedNftsToPurchase[i].price * ethUsdPrice;
        }
        if (selectedNftsToPurchase[i].chainId === 56) {
          selectedNftsToPurchaseAvaxTotalAmount =
            selectedNftsToPurchaseAvaxTotalAmount +
            (selectedNftsToPurchase[i].price * bnbUsdPrice) / avaxUsdPrice;
          selectedNftsToPurchaseUsdTotalAmount =
            selectedNftsToPurchaseUsdTotalAmount +
            selectedNftsToPurchase[i].price * bnbUsdPrice;
        }
        if (selectedNftsToPurchase[i].chainId === 43114) {
          selectedNftsToPurchaseAvaxTotalAmount =
            selectedNftsToPurchaseAvaxTotalAmount +
            parseFloat(selectedNftsToPurchase[i].price);
          selectedNftsToPurchaseUsdTotalAmount =
            selectedNftsToPurchaseUsdTotalAmount +
            selectedNftsToPurchase[i].price * avaxUsdPrice;
        }
      }
      setSelectedNftsToPurchaseAvaxTotalAmount(
        selectedNftsToPurchaseAvaxTotalAmount,
      );
      setSelectedNftsToPurchaseUsdTotalAmount(
        selectedNftsToPurchaseUsdTotalAmount,
      );
    }
  }, [selectedNftsToPurchase]);

  const handleClearButtonClick = () => {
    setSelectedNftsToPurchase([]);
  };

  const handleRemoveSelectedNftToPurchase = (selectedNft: INft): void => {
    if (selectedNftsToPurchase && selectedNftsToPurchase.length > 0) {
      const newSelectedNftsToPurchase = selectedNftsToPurchase.filter(
        function (selectedNftToPurchase: { id: string }) {
          return selectedNftToPurchase.id !== selectedNft.id;
        },
      );
      setSelectedNftsToPurchase(newSelectedNftsToPurchase);
    }
  };

  return (
    <div className="h-full">
      <div className="bg-gray-100 border mb-2 flex flex-col border-gray-300  w-full rounded-2xl overflow-hidden p-4 py-6">
        <div className="flex flex-shrink-0 items-center justify-between mb-2">
          <div className="flex sm:w-full sm:justify-between items-center">
            <div className="flex items-center">
              <div className="font-medium text-2xl text-gray-600 mr-4 md:mr-0 text-bold font-circularstdbold">
                My Cart
              </div>
              {selectedNftsToPurchase && selectedNftsToPurchase.length > 0 && (
                <div className="ml-2 bg-gray-400 rounded-full w-6 h-6 flex items-center justify-center text-md text-white dark:text-gray-800 font-circularstdbook">
                  {selectedNftsToPurchase.length}
                </div>
              )}
            </div>
            {selectedNftsToPurchase && selectedNftsToPurchase.length > 0 && (
              <div
                className="text-xs ml-4 mr-2 text-blue cursor-pointer justify-self-start font-circularstdbold"
                onClick={handleClearButtonClick}
              >
                Clear
              </div>
            )}
          </div>
        </div>
        {!selectedNftsToPurchase ||
          (selectedNftsToPurchase && selectedNftsToPurchase.length === 0 && (
            <div className="text-left text-gray-500  font-circularstdbook">
              {' '}
              Your Ruby Cart is empty. Fill it with NFTs and start collecting.
            </div>
          ))}
        {selectedNftsToPurchase && selectedNftsToPurchase.length > 0 && (
          <div className="text-left text-gray-500  font-circularstdbook">
            {selectedNftsToPurchase.map((selectedNftToPurchase: INft) => (
              <div
                className="flex flex-col my-0.5"
                key={selectedNftToPurchase.id}
              >
                <div className="flex w-full items-center rounded-2xl p-2 relative hover:bg-gray-200 hover:dark:bg-gray-600">
                  <div className="relative w-full flex-shrink-0 h-12 w-12 mr-3 rounded-xl object-cover overflow-hidden">
                    <img
                      src={selectedNftToPurchase.image}
                      alt={selectedNftToPurchase.imageAlt}
                    />
                  </div>
                  <div
                    className="cursor-pointer absolute top-1 left-11 rounded-full hover:bg-red hover:border-red hover:text-white bg-gray-200 text-gray-500 border-1 border-gray-400 h-5 w-5 flex items-center justify-center"
                    onClick={() =>
                      handleRemoveSelectedNftToPurchase(selectedNftToPurchase)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 text-base overflow-hidden flex flex-col items-start w-full cursor-pointer hover:text-blue">
                    <div className="flex font-medium justify-between items-center w-full mb-1">
                      <span className="flex items-center">
                        <div className="truncate font-medium text-gray-700 mr-2 ml-1">
                          {selectedNftToPurchase.name}
                        </div>
                      </span>
                      <div className="flex items-center max-w-full text-base text-gray-700 flex-shrink-0">
                        <div className="truncate">
                          {selectedNftToPurchase.chainId === 1 && (
                            <div className="text-gray-400">
                              {(
                                (selectedNftToPurchase.price * ethUsdPrice) /
                                avaxUsdPrice
                              ).toFixed(2)}
                            </div>
                          )}
                          {selectedNftToPurchase.chainId === 56 && (
                            <div className="text-gray-400">
                              {(
                                (selectedNftToPurchase.price * bnbUsdPrice) /
                                avaxUsdPrice
                              ).toFixed(2)}
                            </div>
                          )}
                          {selectedNftToPurchase.chainId === 43114 && (
                            <div className="text-gray-400">
                              {parseFloat(
                                selectedNftToPurchase.price as unknown as string,
                              ).toFixed(2)}
                            </div>
                          )}
                        </div>
                        <img
                          src="https://nftrade.com/img/chains/currency/avaxCurrency.svg"
                          className="ml-1 transform"
                          style={{ height: '16px', width: '16px' }}
                          alt="avax currency"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="truncate text-left text-xs text-gray-500 mr-2 ml-1">
                        {selectedNftToPurchase.contractName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {selectedNftToPurchase.chainId === 1 && (
                          <div>
                            $
                            {(
                              selectedNftToPurchase.price * ethUsdPrice
                            ).toFixed(2)}
                          </div>
                        )}
                        {selectedNftToPurchase.chainId === 56 && (
                          <div>
                            $
                            {(
                              selectedNftToPurchase.price * bnbUsdPrice
                            ).toFixed(2)}
                          </div>
                        )}
                        {selectedNftToPurchase.chainId === 43114 && (
                          <div>
                            $
                            {(
                              selectedNftToPurchase.price * avaxUsdPrice
                            ).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between flex-shrink-0 pt-4 border-t border-gray-300 dark:border-gray-600 mt-6">
              <div className="font-medium text-2xl text-gray-400 dark:text-gray-400 mt-2">
                You Pay
              </div>
              <div className="flex flex-col items-end mr-2">
                <div className="flex items-center max-w-full text-base font-medium text-gray-700 dark:text-gray-100 mb-1">
                  <div className="truncate flex">
                    {parseFloat(
                      selectedNftsToPurchaseAvaxTotalAmount as unknown as string,
                    ).toFixed(2)}
                    <img
                      src="https://nftrade.com/img/chains/currency/avaxCurrency.svg"
                      className="ml-2 mt-1 transform -translate-y-px"
                      style={{ height: '16px', width: '16px' }}
                      alt="avax currency"
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300">
                  {' '}
                  $
                  {parseFloat(
                    selectedNftsToPurchaseUsdTotalAmount as unknown as string,
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-base font-circularstdbold font-medium cursor-pointer hover:shadow text-white py-3 flex items-center justify-center md:py-4 md:px-6 rounded-xl w-full cursor-pointer md:mr-0 my-auto bg-red-700 hover:bg-red-900 mt-3">
        Connect Wallet
      </div>
    </div>
  );
}
