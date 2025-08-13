const User = require("../module/user");
const Chain = require('../module/chain')
const wallet = require("../utility/wallet");
const logger = require('../config/winston/logger')
const types = {
    solana_ecosystem: 'solana-ecosystem',
    optimism_ecosystem: 'optimism-ecosystem',
    base_ecosystem: 'base-ecosystem'
}

module.exports = {
    generateWallet: async (req, res) => {
        try {
            const user = req.user;

            const isWalletAddress = await Chain.findOne({ User: user._id })
            if (isWalletAddress) {
                logger.logError({ code: 404, body: "already had user wallet address assgin" }, req.BaseData)
                return { code: 404, body: "already had user wallet address assgin" }
            }
            const walletAddress = wallet.solanaWallet();
            const baseAddress = wallet.baseWallet();
            const worldAddress = wallet.wldWallet();

            await Chain.create({ solana: walletAddress.publicKey, base: baseAddress.wallet, world: worldAddress.wallet, User: user._id })
            console.log(walletAddress);
            console.log(baseAddress);
            console.log(worldAddress);
            logger.info(req.logMeta);
            return { code: 200, body: { solanaWallet: walletAddress, basewellet: baseAddress.wallet, worldWallet: worldAddress } }
        } catch (error) {
            console.log(error);
            // return res.status(500).json(error)
            throw error
        }
    },
    userownWallet: async (req, res) => {
        try {
            const User = req.user;
            const WalletsData = await Chain.find({ User: User._id });
            if (!WalletsData) {
                logger.error({ code: 400, body: { messege: 'walltes not found', status: false } }, req.BaseData)
                return {
                    code: 400, body: { messege: 'walltes not found', status: false }
                }
            } logger.info(req.logMeta)
            return { code: 200, body: { WalletsData, status: true } }
        } catch (error) {
            console.log(error);
            logger.logError(error, req.BaseData)
            return res.status(500).json(error);
        }
    }
}