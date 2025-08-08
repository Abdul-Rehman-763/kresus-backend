const express = require('express');
const app=express.Router();
const authenticateToken = require('../middelware/authentication');
const {userVerify,userCode} = require('../controller/user');
const {validateUserVerify}=require("../middelware/joi");
/**
 * @swagger
 * /user/userVerify:
 *   post:
 *     summary: Verify a user by email and verification code
 *     description: Checks if a user with the given email and code exists.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "umer@gmail.com"
 *     responses:
 *       200:
 *         description: User verified successfully
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Server error
 */

app.post("/userVerify",validateUserVerify,userVerify);

/**
 * @swagger
 * /user/userCode:
 *   post:
 *     summary: Send a verification code to the user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Code sent successfully
 *       401:
 *         description: Unauthorized
 */


app.get("/userCode",(req,res)=>{
    res.status(200).send({message:"userCode endpoint is working"})
});
app.post("/userCode",authenticateToken,userCode)
module.exports = app;