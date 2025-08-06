const express = require('express');
const app=express.Router();
const authenticateToken = require('../middelware/authentication');
const {userVerify,userCode} = require('../controller/user');
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
 *                 example: "ali@gmail.com"
 *     responses:
 *       200:
 *         description: User verified successfully
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Server error
 */

app.post("/userVerify",userVerify);

/**
 * @swagger
 * /user/userCode:
 *   post:
 *     summary: Send a verification code to the user
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication
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
 *                 example: noor@example.com
 *     responses:
 *       200:
 *         description: Code sent successfully
 *       401:
 *         description: Unauthorized
 */


app.post("/userCode",authenticateToken,userCode)
module.exports = app;