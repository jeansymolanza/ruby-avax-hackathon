import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import chai from 'chai';
import { ethers, waffle } from 'hardhat';
import RubyArtifact from '../artifacts/contracts/Ruby.sol/Ruby.json';
import DummyNftArtifact from '../artifacts/contracts/DummyNft.sol/DummyNft721A.json';
import { Ruby } from '../typechain/Ruby';
import { DummyNft721A } from '../typechain/DummyNft721A';
import { describe } from 'mocha';

const { deployContract } = waffle;
const { expect } = chai;

describe('Ruby Marketplace', () => {
  let contract: Ruby;
  let nftContract: DummyNft721A;
  let owner: SignerWithAddress;
  let address1: SignerWithAddress;
  let address2: SignerWithAddress;
  let now: Number = new Date().getMilliseconds();
  let blockBeforeTimestamp: Number;

  beforeEach(async () => {
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    blockBeforeTimestamp = blockBefore.timestamp; // A close estimate of the previous block time.

    [owner, address1, address2] = await ethers.getSigners();
    contract = (await deployContract(owner, RubyArtifact, [])) as Ruby;
    nftContract = (await deployContract(owner, DummyNftArtifact, [1000])) as DummyNft721A;
    await nftContract.connect(owner).mint(10);
    await nftContract.connect(address1).mint(5);
    expect(await nftContract.balanceOf(owner.address)).to.equal(10);
    expect(await nftContract.balanceOf(address1.address)).to.equal(5);
  });

  // Disclaimer: very lightweight test

  it('Check listing works', async () => {
    expect(await nftContract.connect(address1).isApprovedForAll(address1.address, contract.address)).to.equal(false);
    await nftContract.connect(address1).setApprovalForAll(contract.address, true);
    expect(await nftContract.connect(address1).isApprovedForAll(address1.address, contract.address)).to.equal(true);
    expect(await contract.isListingActive(nftContract.address, 11)).to.equal(false);
    await contract.connect(address1).listInternal(nftContract.address, 11, 24 * 60 * 60, ethers.utils.parseEther('1'));
    expect(await contract.isListingActive(nftContract.address, 11)).to.equal(true);
  });

  it('Check buying works', async () => {
    await nftContract.connect(address1).setApprovalForAll(contract.address, true);
    await contract.connect(address1).listInternal(nftContract.address, 11, 24 * 60 * 60, ethers.utils.parseEther('1'));
    await contract.connect(owner).purchaseInternal(nftContract.address, 11, {value: ethers.utils.parseEther('1')})
    expect(await nftContract.balanceOf(owner.address)).to.equal(11);
    expect(await nftContract.balanceOf(address1.address)).to.equal(4);
  });

  it('Check bulkbuying works', async () => {
    await nftContract.connect(address1).setApprovalForAll(contract.address, true);
    await contract.connect(address1).listInternal(nftContract.address, 11, 24 * 60 * 60, ethers.utils.parseEther('1'));
    await contract.connect(address1).listInternal(nftContract.address, 12, 24 * 60 * 60, ethers.utils.parseEther('1'));
    await contract.connect(address1).listInternal(nftContract.address, 13, 24 * 60 * 60, ethers.utils.parseEther('1'));
    await contract.connect(owner).bulkPurchase([nftContract.address, nftContract.address, nftContract.address], [11, 12, 13], {value: ethers.utils.parseEther('3')})
    expect(await nftContract.balanceOf(owner.address)).to.equal(13);
    expect(await nftContract.balanceOf(address1.address)).to.equal(2);
  });
});
