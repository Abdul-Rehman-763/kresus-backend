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