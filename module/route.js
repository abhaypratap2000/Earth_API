
const express = require("express");
const controller=require("./controller")

const router = express.Router();
router.route("/mint").post(controller.tokenMint);
router.route("/listNft").get(controller.listLandNFT);
router.route("/addrBalance").get(controller.addrBalance);
router.route("/transferLandTkn").post(controller.transferLandTkn);
router.route("/burnToken").post(controller.burnToken);
module.exports = router;
