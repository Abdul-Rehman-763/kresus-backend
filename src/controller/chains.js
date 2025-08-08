const wallet = require("../utility/wallet");
const Chain=require("../module/chain")
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
    const user=req.user;
    
    const isWalletAddress=await Chain.findOne({User:user._id})
    if(isWalletAddress){
        return res.json({messege:"already had user wallet address assgin",status :false})
    }

    
     const walletAddress= wallet.solanaWallet();
     const baseAddress= wallet.baseWallet();
     const worldAddress=wallet.wldWallet();

   await  Chain.create({solana:walletAddress.publicKey,base:baseAddress.wallet,world:worldAddress.wallet,User:user._id})
     console.log(walletAddress);
     console.log(baseAddress);
     console.log(worldAddress);
    return res.status(200).json({solanaWallet:walletAddress,basewellet:baseAddress.wallet,worldWallet:worldAddress})
    } catch (error) {
        console.log(error);
     return   res.status(500).json(error)
    }
}
exports.getAllWallets=async(req,res)=>{
    try {
        const User=req.user;
        const WalletsData= await Chain.find({User:User._id});
        if(!WalletsData){
            return res.status(400).json({messege:'walltes not found',status:false})
        }
        return res.status(200).json(WalletsData,{status:true})
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.chainsHolding = async (req, res) => {
    getSolanaTokens = await TokenList(types.solana_ecosystem);
    getbaseTokens = await TokenList(types.base_ecosystem);
    getwldToken = await TokenList(types.optimism_ecosystem);
    return res.json(getSolanaTokens, getbaseTokens, getwldToken);
}
