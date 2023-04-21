require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        version: "0.8.18",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        hardhat: {},
        // goerli: {
        //     url: process.env.GOERLI_RPC_URL,
        //     accounts: [process.env.GOERLI_PRIVATE_KEY],
        // },
        mumbai: {
            url: process.env.POLYGON_MUMBAI_RPC,
            accounts: [process.env.POLYGON_MUMBAI_KEY],
        },
        // polygon: {
        //     url: process.env.POLYGON_MAINNET_RPC_URL,
        //     accounts: [process.env.POLYGON_MAINNET_PRIVATE_KEY],
        // },
        // ethMainnet: {
        //     url: process.env.MAINNET_RPC_URL,
        //     accounts: [process.env.MAINNET_PRIVATE_KEY],
        // },
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
