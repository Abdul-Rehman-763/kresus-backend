
const mongoose=require("mongoose");
const topTokens=new mongoose.Schema({
    name:{
        type:String,
    },
    symbol:{
        type:String
    },
    contract_address:{
        type:String,
    },
    percentChange:{
        type:String
    },
    logo:{
        type:String
    },
    usdPrice:{
        type:String
    }
})
const TopTokenModel=mongoose.model('topToken',topTokens);
module.exports=TopTokenModel