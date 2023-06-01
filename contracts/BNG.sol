// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact oxyggen@gmail.com
contract BNG is ERC20, Ownable {
    constructor() ERC20("BNG", "BNG") {
        _mint(msg.sender, 3000000000 * 10 ** decimals());
    }

    function airdrop(
        address[] calldata addresses,
        uint256[] calldata sums
    ) external onlyOwner {
        require(addresses.length == sums.length, "Incorrect arrays");
        for (uint i = 0; i < addresses.length; i++) {
            transfer(addresses[i], sums[i]);
        }
    }
}
