const express=require("express");
const app=express.Router();
const authentication=require("../middelware/authentication")
const {chainsHolding,generateWallet,getAllWallets}=require("../controller/chains")

app.get('/chains',chainsHolding);

app.post('/wallet',authentication,generateWallet);
app.get('/userWallets',authentication,getAllWallets)
module.exports=app;