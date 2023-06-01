const hre = require("hardhat");
const holdersObj = require("../holders.json");

console.log(holdersObj.result.holders.length);

const holders = holdersObj.result.holders;

async function main() {
    const contractAddress = "0x031E995926966156484B5b3159628d68e5335d1c";
    const contract = await hre.ethers.getContractAt("BNG", contractAddress);

    let addressArray = [];
    let sumArray = [];

    for (let i = 1500; i < 1583; i++) {
        const holder = holders[i];
        addressArray.push(holder.holderAddress);
        sumArray.push(holder.balanceRawInteger);
    }

    console.log(addressArray.length);
    console.log(sumArray.length);

    if (addressArray.length != sumArray.length) return;
    const distribute = await contract.airdrop(addressArray, sumArray);
    const receipt = await distribute.wait();
    console.log("Added token wiht tx: " + distribute.hash);
}

main();
