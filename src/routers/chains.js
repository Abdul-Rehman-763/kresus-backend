const express=require("express");
const app=express.Router();
const authentication=require("../middelware/authentication")
const {chainsHolding,generateWallet,getAllWallets,papolarTokenList,tokenDetail,tokenGraph}=require("../controller/chains")
const {tokenDetailVerify}=require('../middelware/joi')
// app.get('/chains',chainsHolding);
app.post('/wallet',authentication,generateWallet);
app.get('/userWallets',authentication,getAllWallets);
app.get('/papolarTokens',tokenDetailVerify,papolarTokenList);
app.get('/tokenDetail/:address',tokenDetailVerify,tokenDetail)
app.get('/tokenGraph',tokenGraph)
module.exports=app