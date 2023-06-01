const { expect } = require("chai");
const { ethers } = require("hardhat");

function getValue(sum) {
    return ethers.utils.parseEther(sum.toFixed(4).toString());
}

function generateWalletList() {
    let list = [];
    for (let i = 0; i < 250; i++) {
        const randWallet = ethers.Wallet.createRandom();
        list.push(randWallet.address);
    }
    return list;
}

describe("NFT contract", function () {
    let Factory;
    let contract;
    let owner;
    let addr1;
    let addr2;
    let addr3;

    beforeEach(async function () {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();
        Factory = await ethers.getContractFactory("BNG");
        contract = await Factory.deploy();
    });

    describe("Do the transfers", function () {
        it("Transfer to 1 holder", async function () {
            const receipt = await contract.connect(owner).transfer(addr1.address, ethers.utils.parseEther("50"));
            const done = await receipt.wait();
            console.log(done);
            expect(await contract.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("50"));
        });
        // it("Transfer to 100 holders", async () => {
        //     let sum = ethers.BigNumber.from(0);
        //     for (let i = 0; i < 101; i++) {
        //         const receipt = await contract.connect(owner).transfer(addr1.address, ethers.utils.parseEther("50"));
        //         const done = await receipt.wait();
        //         sum.add(done.gasUsed);
        //     }
        //     console.log("Total gas used:");
        //     console.log(sum);
        //     console.log(ethers.utils.formatEther(sum));
        // });
        it("Uses distribute function for 100 addresses", async () => {
            const addresses = generateWalletList();
            const sums = Array(250).fill(ethers.utils.parseEther("50"));
            await contract.connect(owner).airdrop(addresses, sums);
            expect(await contract.balanceOf(addresses[0])).to.equal(sums[0]);
            expect(await contract.balanceOf(addresses[85])).to.equal(sums[85]);
        });
    });
});
