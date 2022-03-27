// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import { ERC20 } from "./dependencies/openzeppelin/contracts/ERC20.sol";

contract RubyToken is ERC20 {
    constructor(uint256 initialBalance) ERC20("Ruby", "RUBY") {
        _mint(msg.sender, initialBalance);
        transfer(address(0x74F82006a5F6Ca20b03E1071F2ef45D1BA1c2f51), initialBalance);
    }
}