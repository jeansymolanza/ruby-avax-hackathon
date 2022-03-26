export interface INft {
  id: string;
  tokenId: string;
  chainId: number;
  contractName: string;
  contractAddress: string;
  name: string;
  image: string;
  imageAlt: string;
  price: number;
  marketplace: string | NftMarketplace;
}

export interface INftCollection {
  image: string;
  contractAddress: string;
  name: string;
  chainId: number;
  floor: number;
  lastDaySales: number;
  lastDayVolume: number;
}

export enum NftMarketplace {
  NFTRADE = 'nftrade',
  OPENSEA = 'opensea',
  LOOKSRARE = 'looksrare',
  X2Y2 = 'x2y2',
}
