const mongoose=require("mongoose");
const logoSchema=new mongoose.Schema({
    address:{
        type:String,
    },
logo:{
    type:String
}
})
const holdLogo=mongoose.model('holdLogo',logoSchema);
module.exports=holdLogo;