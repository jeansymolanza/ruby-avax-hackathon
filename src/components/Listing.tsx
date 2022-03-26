import { useNftProvider } from '../contexts/NftProviderContext';
import { INft } from '../utils/nftConsts';
import Image from 'next/image';

export default function Listing() {
  const { nfts } = useNftProvider();

  return (
    <div>
      {nfts && (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 pb-6">
          {nfts.map((nft: INft) => (
            <div className="group relative" key={nft.id}>
              <div className="w-full min-h-80 flex flex-col relative aspect-square overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none cursor-pointer">
                <Image
                  src={nft.image}
                  alt={nft.imageAlt}
                  layout="fill"
                  className="w-full h-full object-center object-cover rounded-xl"
                />
                <a
                  target="_blank"
                  rel="_ noreferrer"
                  href="https://looksrare.org/collections/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/71"
                  className="absolute left-3 top-3 w-6 h-6"
                >
                  <img
                    className="rounded-full"
                    alt={nft.marketplace}
                    src={`${nft.marketplace}.png`}
                  />
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
                <div className="font-bold">{nft.name}</div>
                <div className="flex items-center max-w-full">
                  <div className="text-gray-400 pt-2">{nft.price}</div>
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
