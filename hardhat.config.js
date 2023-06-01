require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        version: "0.8.18",
        settings: {
            optimizer: {
                enabled: true,
                runs: 100,
            },
        },
    },
    networks: {
        hardhat: {},
        mumbai: {
            url: process.env.POLYGON_MUMBAI_RPC,
            accounts: [process.env.POLYGON_MUMBAI_KEY],
        },
        polygon: {
            url: process.env.POLYGON_MAINNET_RPC_URL,
            accounts: [process.env.POLYGON_MAINNET_PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: process.env.POLYGON_ETHERSCAN_KEY,
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        gasPrice: 1750,
    },
};
