const joi=require('joi');
const logger=require("../config/winston/logger")
const userVerifySchema = joi.object({
    email: joi.string().email().required()
});
exports.validateUserVerify = (req, res, next) => {
    const { error } = userVerifySchema.validate(req.body);
    if (error) {
        logger.logError(error.details[0].message,req.BaseData)
        console.error('Validation error:', error);
        return res.status(400).json({ message: error.details[0].message ,status:false});
    }
    next();
}
const tokenAddressSchema = joi.object({
  address: joi.string()
    .pattern(/^0x[a-fA-F0-9]{40}$/) // Ethereum address regex
    .required()
    .messages({
      "string.pattern.base": "Invalid token address format",
      "string.empty": "Token address is required"
    })
});

exports.tokenDetailVerify=(req,res,next)=>{
    const {error}=tokenAddressSchema.validate(req.params);
    if(error){
        logger.logError(error.details[0].message,req.BaseData);
        return res.status(400).json({messege:error.details[0].message,status:false});
    }
    next();
}