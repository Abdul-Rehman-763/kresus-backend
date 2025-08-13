const express = require('express');
const app=express.Router();
const authenticateToken = require('../middelware/authentication');
const {userVerify,userCode} = require('../controller/user');
const {validateUserVerify}=require("../middelware/joi");

app.post("/userVerify",validateUserVerify,userVerify);
app.post("/userCode",authenticateToken,userCode)
module.exports = app;