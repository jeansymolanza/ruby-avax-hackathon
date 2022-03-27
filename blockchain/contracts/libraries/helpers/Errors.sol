// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

/**
 * @title Errors library
 * @author RichAwo
 * @notice Defines the error messages emitted by the different contracts of the RichAwo protocol
 * @dev Error messages prefix glossary:
 *  - MINT = MintLogic
 */
library Errors {

  //contract specific errors
  string public constant MINT_PRESALE_INACTIVE = 'Presale is inactive.';
  string public constant MINT_PUBLIC_SALE_INACTIVE = 'Public sale is inactive.';
  string public constant MINT_PUBLIC_SALE_NOTSTARTED = 'Public sale not started.';
  string public constant CONTRACT_PAUSED = 'Minting is unavailable when the contract is paused';
  string public constant MINT_PREVENT_REENTRANCY = 'Unable to mint more than once.';
  string public constant MINT_PRICE_INVALID = 'Ether value sent is not correct.';
  string public constant MINT_AMOUNT_REJECTED = 'You are not able to mint this many tokens.';
  string public constant MINT_PREVENT_CONTRACTS = 'Smart contracts are not permitted to call the mint function.';
  string public constant STAKE_PAUSED = 'Staking is paused.';
  string public constant STAKE_NOT_LAUNCHED = 'Staking is not launched.';
  
}