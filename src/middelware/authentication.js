const jwt=require('jsonwebtoken');
require("dotenv").config();
const authenticateToken = (req, res, next) => {
    const token=req.headers['authorization'].split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: 'token is missing' });
    }
    const verify=jwt.verify(token, process.env.JWT_SECRET)
    console.log(verify);
    if (!verify) {
        return res.status(403).json({ message: 'Invalid token' });  
    }
    req.user=verify
        next();
    }
    module.exports = authenticateToken;

