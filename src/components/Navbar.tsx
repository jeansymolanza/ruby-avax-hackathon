import { SearchIcon } from '@heroicons/react/solid';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { useWalletProvider } from '../contexts/WalletProviderContext';
import { AVAX_DEV_CHAIN_ID } from '../utils/walletHelper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navbar() {
  const {
    connect,
    disconnect,
    connectData,
    accountData,
    networkData,
    switchNetwork,
  } = useWalletProvider();

  const [nftSearchContractAddress] = useState(
    '0xed5af388653567af2f388e6224dc7c4b3241c544',
  );

  const router = useRouter();

  const handleSearchInputKeydown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      router.push(`/collection/${nftSearchContractAddress}`).then();
    }
  };

  return (
    <>
      <div className="sticky z-40 w-screen border-b py-5 px-6 bg-white flex items-center h-20 justify-between top-0">
        <div className="w-full flex items-center">
          <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2 pr-8">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" passHref>
                <a rel="noopener noreferrer">
                  <img
                    className="block h-8 w-auto"
                    src={'../ruby_logo.png'}
                    alt="Ruby"
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
              <div className="w-full">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full bg-white border-2 border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm border-gray-300 p-2 px-4 w-full text-sm max-w-xl outline-none focus:border-gray-500 font-circularstdmedium"
                    placeholder="Search items, collections, and profiles"
                    autoComplete="off"
                    type="search"
                    onKeyDown={handleSearchInputKeydown}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
            <a
              href="#"
              className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            </a>
            {!accountData && (
              <button
                onClick={() => {
                  connect(connectData.connectors[1]).then();
                }}
                className="ml-6 inline-flex items-center border-2 p-0.5 h-10 border-gray-300 cursor-pointer rounded-xl flex justify-center items-center hover:border-gray-500 hover:shadow text-sm font-circularstdbold text-gray-700 px-3"
              >
                Connect Wallet
              </button>
            )}
            {accountData && networkData.chain.id == AVAX_DEV_CHAIN_ID && (
              <button
                onClick={() => {
                  disconnect();
                }}
                className="ml-6 inline-flex items-center border-2 p-0.5 h-10 border-gray-300 cursor-pointer rounded-xl flex justify-center items-center hover:border-gray-500 hover:shadow text-sm font-circularstdbold text-gray-700 px-3"
              >
                Disconnect{' '}
                {accountData.address.substring(
                  0,
                  accountData.address.startsWith('0x') ? 6 : 3,
                )}
                ...
              </button>
            )}
            {accountData && networkData.chain.id != AVAX_DEV_CHAIN_ID && (
              <button
                onClick={() => {
                  switchNetwork(AVAX_DEV_CHAIN_ID);
                }}
                className="ml-6 inline-flex items-center border-2 p-0.5 h-10 border-gray-300 cursor-pointer rounded-xl flex justify-center items-center hover:border-gray-500 hover:shadow text-sm font-circularstdbold text-gray-700 px-3"
              >
                Switch Network
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
