const User = require("../module/user");
const Chain = require('../module/chain')
const wallet = require("../utility/wallet");
const Moralis = require("moralis").default;
require('dotenv').config();
const logger = require('../config/winston/logger')
const { getTokenDetails, tokenHistory } = require('../utility/covelent')
Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
const popularTokenModule=require('../module/popularTokens')

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
    },
    papolarTokenList: async (req) => {
        try {
            async function getPriceMovers() {
                const response = await Moralis.EvmApi.marketData.getTopERC20TokensByPriceMovers();
                // console.log("Gainers:", response.raw.gainers);
                // console.log("Losers:", response.raw.losers);
                if(response){
                    await popularTokenModule.deleteMany({});
                    const data=await popularTokenModule.create({higher:response.raw.gainers,lower:response.raw.losers});
                    await data.save();
                
                return {
                    code: 200, body: { heigher: response.raw.gainers, lower: response.raw.losers }
                }
            }

            }
            if(req.query.hardRefresh==="true"){
            
                const { code, body } = await getPriceMovers();
                 return {
                code, body
            }
            }
            const {higher,lower}=await popularTokenModule.findOne({});
            
            return {
                    code: 200, body: { higher, lower,data:"data from db"}
                }
           
        }
        catch (error) {
            throw error
        }
    },
    tokenDetail: async (address) => {
        try {
            let chainId;
            if (address) {
                const start = address.slice(0, 2)
                start === '0x' ? (chainId = 8453) : null
            }
            console.log(chainId);
            const fetchData = await getTokenDetails(address, chainId);

            return fetchData;
        } catch (error) {
            throw error
        }
    },
    tokenGraph: async ({ address, from, end }) => {

        try {
            const graphData = await tokenHistory(8453, address, from, end);
            return graphData
        } catch (error) {
            return error;
        }
    }
}
