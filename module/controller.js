const Web3 = require("web3");
const Tran = require('ethereumjs-tx');
const EEAClient = require("web3-eea");
const Common = require('ethereumjs-common')
const NftMarketPlace = require("../blockchain/build/contracts/LandNFT.json");

const chainId = 5777;
const networkId = 5777;
const landNFTAddress = "0xF2993e94d5d8C7AD2E9428bA58E347E78d9F2F82";

const web3 = new EEAClient(new Web3("HTTP://127.0.0.1:7545"), chainId);
const Tx = Tran.Transaction;
const NftMarketPlace_ABI = NftMarketPlace.abi;
const deployedLandNFT = new web3.eth.Contract(NftMarketPlace_ABI, landNFTAddress);

/**
 * Mint token by admin
 * @param {privatekey,toAddress,mongodbId} req 
 * @param {message,receipt} res     
 * @param {*} next 
 */
exports.tokenMint = async (req, res, next) => {
    try { 
        const privatekey = req.body.privatekey
        let account = web3.eth.accounts.privateKeyToAccount(`0x${privatekey}`)
        const nonce = await web3.eth.getTransactionCount(account.address, "pending");
        const gasprice = await web3.eth.getGasPrice();
        const buffer1 = Buffer.from(privatekey, "hex");
        const data = await deployedLandNFT.methods
            .safeMint(
                req.body.toAddress,
                req.body.mongodbId,
            ).encodeABI();
        const txObj = {
            to: landNFTAddress,
            gas: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(gasprice),
            data: data,
            nonce: web3.utils.toHex(nonce),
        };
        let custom = await Common.default.forCustomChain("mainnet", {
            networkId: parseInt(networkId),
            chainId: parseInt(chainId),
            name: "development"
        },
            "istanbul"
        )
        const txn = new Tx(txObj, { common: custom });
        txn.sign(buffer1);
        const serialTx = txn.serialize();
        const raw = "0x" + serialTx.toString("hex");
        const receipt = await web3.eth.sendSignedTransaction(raw);
        console.log("receipt", receipt)
        res.status(200).send({ message: "Token minted successfully", receipt: receipt })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Something went wrong", error: error })
    }
}
/**
 * Fetch landNFT details by using tokenId
 * @param {nftId} req 
 * @param {message,NFTDetails} res 
 * @param {*} next 
 */
exports.listLandNFT = async (req, res, next) => {
    try {
        const NFTDetails = await deployedLandNFT.methods.landDetails(req.body.nftId).call();
        res.status(200).send({ message: "Fetch land NFT successfully", NFTDetails: NFTDetails })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Something went wrong", error: error })
    }
}
/**
 *  Fetch NFT balance by using account address
 * @param {account} req 
 * @param {message,addrBalance} res 
 * @param {*} next 
 */
exports.addrBalance = async (req, res, next) => {
    try {
        const addrBalance = await deployedLandNFT.methods.balOf(req.body.account).call();
        res.status(200).send({ message: "Fetch address balance successfully", addrBalance: addrBalance })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Something went wrong", error: error })
    }
}
/**
 * Transfer land NFT from seller account to buyer account 
 * @param {privatekey,toAddress,tokenId} req 
 * @param {message,receipt} res 
 * @param {*} next 
 */
exports.transferLandTkn = async (req, res, next) => {
    try {
        const privatekey = req.body.privatekey
        let account = web3.eth.accounts.privateKeyToAccount(`0x${privatekey}`)
        const nonce = await web3.eth.getTransactionCount(account.address, "pending");
        const gasprice = await web3.eth.getGasPrice();
        const buffer1 = Buffer.from(privatekey, "hex");
        const data = await deployedLandNFT.methods
            .safeTransfer(
                req.body.toAddress,
                req.body.tokenId,
            ).encodeABI();
        const txObj = {
            to: landNFTAddress,
            gas: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(gasprice),
            data: data,
            nonce: web3.utils.toHex(nonce),
        };
        let custom = await Common.default.forCustomChain("mainnet", {
            networkId: parseInt(networkId),
            chainId: parseInt(chainId),
            name: "development"
        },
            "istanbul"
        )
        const txn = new Tx(txObj, { common: custom });
        txn.sign(buffer1);
        const serialTx = txn.serialize();
        const raw = "0x" + serialTx.toString("hex");
        const receipt = await web3.eth.sendSignedTransaction(raw);
        console.log("receipt", receipt)
        res.status(200).send({ message: "LandNFT transfered successfully", receipt: receipt })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Something went wrong", error })
    }
}
/**
 *  Token owner destroy NFT by using tokenId
 * @param {tokenId} req 
 * @param {message,receipt} res 
 * @param {*} next 
 */
exports.burnToken = async (req, res, next) => {
    try {
        const privatekey = req.body.privatekey
        let account = web3.eth.accounts.privateKeyToAccount(`0x${privatekey}`)
        const nonce = await web3.eth.getTransactionCount(account.address, "pending");
        const gasprice = await web3.eth.getGasPrice();
        const buffer1 = Buffer.from(privatekey, "hex");
        const data = await deployedLandNFT.methods
            .deleteNFT(
                req.body.tokenId,
            ).encodeABI();
        const txObj = {
            to: landNFTAddress,
            gas: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(gasprice),
            data: data,
            nonce: web3.utils.toHex(nonce),
        };
        let custom = await Common.default.forCustomChain("mainnet", {
            networkId: parseInt(networkId),
            chainId: parseInt(chainId),
            name: "development"
        },
            "istanbul"
        )
        const txn = new Tx(txObj, { common: custom });
        txn.sign(buffer1);
        const serialTx = txn.serialize();
        const raw = "0x" + serialTx.toString("hex");
        const receipt = await web3.eth.sendSignedTransaction(raw);
        console.log("receipt", receipt)
        res.status(200).send({ message: "LandNFT destroyed successfully", receipt: receipt })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Something went wrong", error })
    }
}