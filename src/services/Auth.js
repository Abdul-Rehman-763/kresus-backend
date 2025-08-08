const e = require('express');
const User = require('../module/user');
const { createToken } = require("../utility/jwt");
module.exports = {
    userVerify: async (req, res) => {
        const { email } = req.body;
        try {
            if (!email) {
                return {
                    code: 400,
                    body: { message: 'Email is required' }
                };
            }

            const user = await User.findOne({ email });
            if (!user) {
                return {
                    code: 404,
                    body: { message: 'User not found' }
                };
            }
            token = await createToken(email);
            return {
                code: 200,
                body: { message: 'User verified successfully', token }
            };
        } catch (error) {
            throw error;
        }
    },
    userCode: async (req) => {
        try {
            const { code } = req.body;
            const user = req.user;
            if (!code) {
                return {
                    code: 400,
                    body: { message: 'Code is required' }
                }
            }
            if(code.length<6){
                return {
                    code: 400,
                    body: { message: 'Code must be 6 characters long' }
                }
            }

            if (user.code !== code) {
                return {
                    code: 400,
                    body: { message: 'Incorrect code' }
                }
            }
            return {
                code: 200,
                body: { message: 'Code verified successfully' }
            }
        } catch (error) {
            throw error;
        }
    }
}