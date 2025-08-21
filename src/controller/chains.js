const wallet = require("../utility/wallet");
const Chain=require("../module/chain")
const ChainService=require('../services/chain');
const Response = require("../utility/Response");

const types = {
    solana_ecosystem: 'solana-ecosystem',
    optimism_ecosystem: 'optimism-ecosystem',
    base_ecosystem: 'base-ecosystem'
}

const TokenList = async (category) => {
    try {
        const url = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${category}&order=market_cap_desc&per_page=100&page=1`);
        const tokens = await url.json();
        console.log(tokens);
        return tokens
    }

    catch (error) {
        console.log(error);
        return error
    }
}

exports.generateWallet=async(req,res)=>{
 try {
    ChainService.generateWallet(req).then(resp=>{
        return Response.Send.Raw(res,resp.code,resp.body) })
 } catch (error) {
    res.status(500).json('server error');
 }
}
exports.getAllWallets=async(req,res)=>{
  try {
    ChainService.userownWallet(req).then(resp=>{
        return Response.Send.Raw(res,resp.code,resp.body);
    })
  } catch (error) {
    logger.logError(error,req.BaseData)
    throw error;
  }
}
exports.papolarTokenList=async(req,res)=>{
  try {
    ChainService.papolarTokenList().then(resp=>{
        return Response.Send.Raw(res,resp.code,resp.body);
    })
    
  } catch (error) {
    throw error
  }
}

// exports.chainsHolding = async (req, res) => {
//     getSolanaTokens = await TokenList(types.solana_ecosystem);
//     getbaseTokens = await TokenList(types.base_ecosystem);
//     getwldToken = await TokenList(types.optimism_ecosystem);
//     return res.json(getSolanaTokens, getbaseTokens, getwldToken);
// }
