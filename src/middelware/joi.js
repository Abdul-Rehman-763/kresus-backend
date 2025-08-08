const joi=require('joi');
const userVerifySchema = joi.object({
    email: joi.string().email().required()
});
exports.validateUserVerify = (req, res, next) => {
    const { error } = userVerifySchema.validate(req.body);
    if (error) {
        console.error('Validation error:', error.details[0].message);
        return res.status(400).json({ message: error.details[0].message ,status:false});
    }
    next();
}