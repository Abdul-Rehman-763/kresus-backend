const express=require("express");
const app=express.Router();
const authentication=require("../middelware/authentication")
const {chainsHolding,generateWallet,getAllWallets,papolarTokenList}=require("../controller/chains")

// app.get('/chains',chainsHolding);
app.post('/wallet',authentication,generateWallet);
app.get('/userWallets',authentication,getAllWallets);
app.get('/papolarTokens',papolarTokenList)
module.exports=app;