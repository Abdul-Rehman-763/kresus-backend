const mongoose=require("mongoose");
const popularTokenSchema=new mongoose.Schema({
    higher:{
        type:Array,
        default:[]
    },
    lower:{
        type:Array,
        default:[]
    }
})
const popularTokenModule=mongoose.model("popularToken",popularTokenSchema);
module.exports=popularTokenModule;