const mongoose = require('mongoose');

chainSchema=new mongoose.Schema({

    solana:{
        type:String,
        required:true
    },
    base:{
        type:String,
        required:true
    },
     world:{
        type:String,
        required:true
    },
    User:{
        type:mongoose.Schema.Types.ObjectId   }
},
{
    timestamps:true
});
const Chain= mongoose.model("Chain",chainSchema);
module.exports=Chain;