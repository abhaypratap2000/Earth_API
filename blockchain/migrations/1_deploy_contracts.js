
var landNFT = artifacts.require("LandNFT.sol");

module.exports = async function(deployer,network) {
  await deployer.deploy(landNFT);
  const deploylandNFT = await landNFT.deployed();
  console.log("Land NFT Contract Address:", deploylandNFT.address);
}
