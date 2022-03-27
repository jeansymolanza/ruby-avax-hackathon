//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./dependencies/openzeppelin/contracts/IERC721.sol";
import "./dependencies/openzeppelin/contracts/Ownable.sol";
import "./dependencies/openzeppelin/contracts/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract Ruby is Ownable, ReentrancyGuard {
    
    bool isPaused;
    address[] bannedContracts;
    address payable feeCollectionAddress;
    uint256 feesDistributed;
    uint256 collected;
    uint256 public constant platformFeePc = 2;
    
    struct listingDetails {
      uint256 price;
      uint256 expiry;
      bool isActive;
      address owner;
    }

    struct bid {
      uint256 user;
      uint256 price;
      uint256 expiry;
      bool isActive;
    }

    mapping(address => bid[]) public collectionBids; // NftAddress => bid
    mapping(address => mapping(uint256 => listingDetails)) public internalListings; // NftAddress => tokenId => Listing Details

    event Listing(
        address indexed owner,
        address collection,
        uint256 tokenId
    );

    event Purchase(
      address indexed buyer,
      address seller,
      address collection,
      uint256 tokenId
    );

    constructor() {
    }

    modifier checkIsPaused() {
      require(!isPaused, "All market interactions are curently paused.");
      _;
    }

    function listInternal(address collection, uint256 tokenId, uint256 duration, uint256 price) public checkIsPaused {      
      console.log('block timestamp: ', block.timestamp);
      require(IERC721(collection).ownerOf(tokenId) == _msgSender(), 'Seller no longer owns NFT.');
      require(IERC721(collection).isApprovedForAll(_msgSender(), address(this)), 'Seller must provide collection acceess.');
      internalListings[collection][tokenId] = listingDetails(price, block.timestamp + duration, true, _msgSender());
    }

    function _purchaseValidationChecks(address collection, uint256 tokenId) internal {
      address seller = internalListings[collection][tokenId].owner;
      require(internalListings[collection][tokenId].isActive, 'Listing no longer active.');
      require(internalListings[collection][tokenId].expiry > block.timestamp, 'Listing has expired.');
      require(msg.value >= internalListings[collection][tokenId].price, 'Incorrect price.');
      require(IERC721(collection).ownerOf(tokenId) == seller, 'Seller no longer owns NFT.');
      require(IERC721(collection).isApprovedForAll(seller, address(this)), 'Seller has revoked access.');
    }

    function _purchase(address collection, uint256 tokenId) internal {
      address seller = internalListings[collection][tokenId].owner;
      internalListings[collection][tokenId].isActive = false;
      uint256 price = internalListings[collection][tokenId].price;
      payable(seller).transfer(price * (100 - platformFeePc) / 100);
      feeCollectionAddress.transfer(price * (platformFeePc / 100));
      IERC721(collection).safeTransferFrom( seller, _msgSender(), tokenId);
      emit Purchase(_msgSender(), seller, collection, tokenId);
    }

    function purchaseInternal(address collection, uint256 tokenId) public payable checkIsPaused {
      _purchaseValidationChecks(collection, tokenId);
      _purchase(collection, tokenId);
    }
    
    function bulkPurchase(address[] memory collections, uint256[] memory tokenIds) public payable checkIsPaused {
      for (uint256 i; i < tokenIds.length; i++) {
        address collection = collections[i];
        uint256 tokenId = tokenIds[i];
        _purchaseValidationChecks(collection, tokenId);
        _purchase(collection, tokenId);
      }
    }
    
    function getNftListingPrice(address collection, uint256 tokenId) public view returns(uint256) {
      return internalListings[collection][tokenId].price;
    }

    function isListingActive(address collection, uint256 tokenId) public view returns(bool) {
      return (internalListings[collection][tokenId].expiry > block.timestamp) && internalListings[collection][tokenId].isActive;
    }
}
