const landNFT = artifacts.require("LandNFT.sol");
const truffleAssert = require('truffle-assertions');
contract("LandNFT", async (accounts) => {
    let deploylandNFT;
    before(async () => {
        deploylandNFT = await landNFT.deployed();
        landNft = deploylandNFT.address
    })
    it("Should be mint landNFT by admin", async () => {
        await deploylandNFT
            .safeMint(accounts[1], "101", { from: accounts[0] })
    })
    it("Should not be mint landNFT without admin", async () => {
        await truffleAssert.reverts(deploylandNFT
            .safeMint(accounts[2], "102", { from: accounts[1] }),
            "Error : unauthorized admin account address.")
    })
    it("Should be fetch landNFT by NFTId ", async () => {
        const buyerOfLandNFT = await deploylandNFT.landDetails(0)
        expect(buyerOfLandNFT.owner).to.be.equal(accounts[1]);
        expect(buyerOfLandNFT.owner).to.be.not.equal(accounts[2]);
    })
    it("Should be fetch account NFT balance",async()=>{
        const accountBal = await deploylandNFT.balOf(accounts[1])
        expect(accountBal.toString()).to.be.equal("1")
        expect(accountBal.toString()).to.be.not.equal("2")
    })
    it("Should be transfer land NFT from seller to buyer account",async()=>{
        const beforeTransfer = await deploylandNFT.balanceOf(accounts[2])
        expect(beforeTransfer.toString()).to.be.equal("0")
        await deploylandNFT.safeTransfer(accounts[2], 0, { from: accounts[1] })
        const afterTransfer = await deploylandNFT.balanceOf(accounts[2])
        expect(afterTransfer.toString()).to.be.equal("1")
    })

})
