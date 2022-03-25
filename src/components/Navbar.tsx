import { SearchIcon } from '@heroicons/react/solid';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { useWalletProvider } from '../contexts/WalletProviderContext';
import { AVAX_DEV_CHAIN_ID } from '../utils/walletHelper';

export default function Navbar() {
  const {
    connect,
    disconnect,
    connectData,
    accountData,
    networkData,
    switchNetwork,
  } = useWalletProvider();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
          <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
            <div className="flex-shrink-0 flex items-center">
              <a href="#">
                <img
                  className="block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                  alt="Workflow"
                />
              </a>
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
                    className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
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
                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Connect Wallet
              </button>
            )}
            {accountData && networkData.chain.id == AVAX_DEV_CHAIN_ID && (
              <button
                onClick={() => {
                  disconnect();
                }}
                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
