// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./dependencies/erc721a/contracts/ERC721A.sol";
import "./dependencies/openzeppelin/contracts/Ownable.sol";
import "./dependencies/openzeppelin/contracts/SafeMath.sol";
import "./dependencies/openzeppelin/contracts/Strings.sol";
import "./dependencies/openzeppelin/contracts/ECDSA.sol";
import "./dependencies/openzeppelin/contracts/Pausable.sol";
import {Errors} from './libraries/helpers/Errors.sol';

/**
 * @title Dummy ERC721Tradable
 * ERC721Tradable - ERC721 contract that whitelists a trading address, cleaand has minting functionality, merkel root setting and token meta randomisation
 */
contract DummyNft721A is ERC721A, Ownable, Pausable {
    using Address for address;
    using ECDSA for bytes32;


    // Supply Variables (e.g. 7500 - max inc bebes,14,0,5000,0 )
    uint256 public maxSupply;

    // Sale State Variables
    mapping(address => bool) public mintedList;
    mapping(address => bool) public publicMintedList;

    string private baseURI;
    string private contURI;

    constructor(
        uint256 supply
    ) ERC721A("AvaxDummies", "AVADS") {
        maxSupply = supply;
        currentIndex = 0;
    }

    /** *********************************** **/
    /** ********* Minting Functions ******* **/
    /** *********************************** **/
    function mint(uint256 _quantity) public {
        _safeMint(msg.sender, _quantity);
    }

    function tokensOfOwner(
        address _owner,
        uint256 startId,
        uint256 endId
    ) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 index;

            for (uint256 tokenId = startId; tokenId < endId; tokenId++) {
                if (index == tokenCount) break;

                if (ownerOf(tokenId) == _owner) {
                    result[index] = tokenId;
                    index++;
                }
            }

            return result;
        }
    }

    function walletOfOwner(address address_)
        external
        view
        returns (uint256[] memory)
    {
        uint256 _balance = balanceOf(address_);
        if (_balance == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory _tokens = new uint256[](_balance);
            uint256 _index;

            for (uint256 i = 0; i < maxSupply; i++) {
                if (address_ == ownerOf(i)) {
                    _tokens[_index] = i;
                    _index++;
                }
            }

            return _tokens;
        }
    }

    /** *********************************** **/
    /** ********* Owner Functions ********* **/
    /** *********************************** **/

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function setBaseURI(string memory uri) public onlyOwner {
        baseURI = uri;
    }

    function setContractURI(string memory uri) public onlyOwner {
        contURI = uri;
    }

    /* enables owner to pause / unpause minting */
    function setPaused(bool _paused) external onlyOwner {
        if (_paused) _pause();
        else _unpause();
    }

    /** *********************************** **/
    /** ********* View Functions ********* **/
    /** *********************************** **/

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function exists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }

    function numberMinted(address owner) public view returns (uint256) {
        return _numberMinted(owner);
    }

    //base url for returning info about the token collection contract
    function contractURI() external view returns (string memory) {
        return contURI;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        //deleted code here... verify
        return string(abi.encodePacked(_baseURI(), Strings.toString(_tokenId)));
    }
}