const jwt = require('jsonwebtoken');
const User = require('../module/user');
const logger=require('../config/winston/logger')
require("dotenv").config()
;
const authenticateToken = async(req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            logger.logError({ message: 'Authorization header missing' },req.BaseData)
           return res.status(401).json({ message: 'Authorization header missing' });
        }
        const token = authHeader.split(' ')[1];
        console.log('token', token  );
            if(!token) {

            return res.status(401).json({ message: ' token' });
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        console.log('this is ',verify);
        if (!verify) {
            loggerError({messege:'Invalid'},req.BaseData)
            return res.status(403).json({ message: 'Invalid token' });
        }
        const user=await User.findOne({ email: verify.email });
        req.user = user
        console.log(user);
        next();
        
    } catch (error) {
        logger.logError(error,req.BaseData)
        console.error('Error in authentication middleware:', error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}

module.exports = authenticateToken;

