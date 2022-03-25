import * as React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useWalletProvider } from '../contexts/WalletProviderContext';

type ConnectWalletModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ConnectWalletModal = ({
  isOpen,
  setIsOpen,
}: ConnectWalletModalProps) => {
  const { connect, connectData } = useWalletProvider();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-xl p-9 my-12 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-2xl font-bold leading-6 text-gray-900 pb-2 font-proximanovabold"
              >
                Connect Wallet
              </Dialog.Title>
              <div className="mt-2 mb-8">
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Connect your wallet to start purchasing NFTs.
                </p>
                <ul className="my-4 space-y-3 pt-6">
                  <li>
                    <a
                      href="#"
                      onClick={() => {
                        connect(connectData.connectors[1]).then();
                        setIsOpen(false);
                      }}
                      className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <svg
                        className="h-5"
                        viewBox="0 0 292 292"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M145.7 291.66C226.146 291.66 291.36 226.446 291.36 146C291.36 65.5541 226.146 0.339844 145.7 0.339844C65.2542 0.339844 0.0400391 65.5541 0.0400391 146C0.0400391 226.446 65.2542 291.66 145.7 291.66Z"
                          fill="#3259A5"
                        />
                        <path
                          d="M195.94 155.5C191.49 179.08 170.8 196.91 145.93 196.91C117.81 196.91 95.0204 174.12 95.0204 146C95.0204 117.88 117.81 95.0897 145.93 95.0897C170.8 95.0897 191.49 112.93 195.94 136.5H247.31C242.52 84.7197 198.96 44.1797 145.93 44.1797C89.6904 44.1797 44.1104 89.7697 44.1104 146C44.1104 202.24 89.7004 247.82 145.93 247.82C198.96 247.82 242.52 207.28 247.31 155.5H195.94Z"
                          fill="white"
                        />
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Coinbase Wallet
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
