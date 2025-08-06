const jwt = require('jsonwebtoken');
require("dotenv").config();
exports.createToken=async(email)=>{
return token=jwt.sign(({email}),process.env.JWT_SECRET)
}
