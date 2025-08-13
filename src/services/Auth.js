const app = require('express');
const User = require('../module/user');
const { createToken } = require("../utility/jwt");
const logger = require('../config/winston/logger');
module.exports = {
    userVerify: async (req, res) => {
        const { email } = req.body;
        try {

            const user = await User.findOne({ email });
            if (!user) {
                logger.logError({ message: 'User not found', code: 404 }, req.BaseData)
                return {
                    code: 404,
                    body: { message: 'User not found' }
                };
            }
            token = await createToken(email);
            logger.info(req.logMeta);
            console.log(app.currentData, app.currentRoute)
            return {
                code: 200,
                body: { message: 'User verified successfully', token }
            };
        } catch (error) {
            logger.logError(error, req.BaseData);
            throw error;
        }
    },
    userCode: async (req) => {
        try {
            const { code } = req.body;
            const user = req.user;
            if (!code) {
                logger.logError({
                    code: 400,
                    body: { message: 'Code is required' }
                }, req.BaseData)
                return {
                    code: 400,
                    body: { message: 'Code is required' }
                }
            }
            if (code.length < 6) {
                logger.logError({
                    code: 400,
                    body: { message: 'Code must be 6 characters long' }
                }, req.BaseData)
                return {
                    code: 400,
                    body: { message: 'Code must be 6 characters long' }
                }
            }

            if (user.code !== code) {
                logger.logError(
                    {
                        code: 400,
                        body: { message: 'Incorrect code' }
                    },
                    req.BaseData
                )
                return {
                    code: 400,
                    body: { message: 'Incorrect code' }
                }
            }
            logger.info(req.logMeta)
            return {
                code: 200,
                body: { message: 'Code verified successfully' }
            }
        } catch (error) {
            throw error;
        }
    }
}