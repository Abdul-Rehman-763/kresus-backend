const User = require("../module/user");
const Chain = require('../module/chain')
const wallet = require("../utility/wallet");
const Moralis = require("moralis").default;
const Axios = require('../utility/Axios')

require('dotenv').config();
const logger = require('../utility/logger')
const { getTokenDetails, tokenHistory ,getHolderCount} = require('../utility/covelent')
Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
const popularTokenModule = require('../module/popularTokens');
const { papolarTokenList } = require("../controller/chains");
const { max } = require("lodash");

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
                logger.error({ code: 404, body: "already had user wallet address assgin" }, req.BaseData)
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
            logger.error(error, req.BaseData)
            return res.status(500).json(error);
        }
    },
    papolarTokenList: async (req) => {
        try {
            async function getPriceMovers() {
                const response = await Moralis.EvmApi.marketData.getTopERC20TokensByPriceMovers();
                // console.log("Gainers:", response.raw.gainers);
                // console.log("Losers:", response.raw.losers);
                if (response) {
                    await popularTokenModule.deleteMany({});
                    const data = await popularTokenModule.create({ higher: response.raw.gainers, lower: response.raw.losers });
                    await data.save();

                    return {
                        code: 200, body: { heigher: response.raw.gainers, lower: response.raw.losers }
                    }
                }

            }
            if (req.query.hardRefresh === "true") {

                const { code, body } = await getPriceMovers();
                return {
                    code, body
                }
            }
            const { higher, lower } = await popularTokenModule.findOne({});

            return {
                code: 200, body: { higher, lower, data: "data from db" }
            }

        }
        catch (error) {
            throw error
        }
    },

    // papolarTokenList: async () => {

    //     const url =
    //         "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";

    //     const res = await fetch(url);
    //     const data = await res.json();

    //     // Only keep base/native tokens

    //     const baseTokens = data.filter(token =>
    //         ["ethereum", "binancecoin", "polygon", "avalanche-2", "sui"].includes(
    //             token.id
    //         )
    //     );
    //     const datafilter = baseTokens.map(t => ({
    //         name: t.name,
    //         symbol: t.symbol.toUpperCase(),
    //         price_usd: t.current_price,
    //         market_cap_usd: t.market_cap,

    //     }))
    //     return { code: 200, body: { datafilter, status: true } }


    // },
    tokenDetail: async (address) => {
        try {
            let chainId;
            if (address) {
                const start = address.slice(0, 2)
                start === '0x' ? (chainId = 8453) : null
            }
            console.log(chainId);
            const fetchData = await getTokenDetails(address, chainId);
            const holders= await getHolderCount(8453, address);
            console.log(holders,'holders');
            // logger.info()
            return {...fetchData,holders:holders};
        } catch (error) {
            throw error
        }
    },

    // tokenDetail: async (addresses) => {
    //     try {
    //         console.log(addresses,'this is address')
    //        const response=await Axios(
    //             `https://deep-index.moralis.io/api/v2.2/erc20/metadata?chain=eth&addresses[0]=${addresses}`,
    //             'get',
    //             {},
    //             {
    //                 headers: {
    //                     'X-API-Key': process.env.MORALIS_API_KEY,
    //                 },
    //             }
    //         );
    //       const Holder= await getHolderCount(8453, addresses);
    //         console.log(response.data,'this is response');
    //         return {
    //             name:response.data[0].name,
    //             symbol:response.data[0].symbol,
    //             contract_address:response.data[0].address,
    //             image:response.data[0].logo,
    //             decimals:response.data[0].decimals,
    //             totalsupply:response.data[0].total_supply,
    //             circulating_supply:response.data[0].circulating_supply,
    //             Holder

    //         }
    //         return response.data
    //     } catch (error) {
    //         throw error

    //     };

    // },
    tokenGraph: async ({ address, from, end }) => {

        try {
            const graphData = await tokenHistory(8453, address, from, end);
            return graphData
        } catch (error) {
            return error;
        }
    }
}
