const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

function getValue(sum) {
    return ethers.utils.parseEther(sum.toFixed(4).toString());
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

    // SNIPPETS
    // await contract.connect(owner).flipSaleState();

    // await contract.connect(addr1).publicMint(freePerTxn);
    // await expect(contract.connect(addr1).publicMint(freePerTxn)).to.be.revertedWith("Incorrect ETH amount");
    // await contract.connect(addr1).publicMint(8, {value: ethers.utils.parseEther((8*publicPrice).toString())});
    // expect(await contract.mintedQuantity(addr1.address)).to.equal(publicPerTxn*2);

    // await contract.connect(addr1).whitelistMint(wlPerWallet, proof1);

    describe("Do the transfers", function () {
        // beforeEach(async function () {
        //     await contract.connect(owner).flipSaleState();
        // });
        it("Transfer to 1 holder", async function () {
            const receipt = await contract.connect(owner).transfer(addr1.address, ethers.utils.parseEther("50"));
            const done = await receipt.wait();
            console.log(done);
            expect(await contract.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("50"));
        });
        it("Transfer to 100 holders", async () => {
            let sum = ethers.BigNumber.from(0);
            for (let i = 0; i < 101; i++) {
                const receipt = await contract.connect(owner).transfer(addr1.address, ethers.utils.parseEther("50"));
                const done = await receipt.wait();
                sum.add(done.gasUsed);
            }
            console.log("Total gas used:");
            console.log(sum);
            console.log(ethers.utils.formatEther(sum));
        });
    });
});
