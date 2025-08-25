const express = require('express');
const dbConnect=require('./src/config/dbconnection')
const cors=require('cors');


require('dotenv').config();
const {seed}=require('./src/config/seeds/seed');
const  route = require('./src/routers/user');
const chain=require('./src/routers/chains')
const {specs,sweggerUi}=require('./src/config/swagger');
const { node } = require('./src/config/nodemailer');
const logger=require("./src/config/winston/logger")

const app=express();
const allowedOrigins = [
  'http://localhost:5000',
  'https://64396e5e8685.ngrok-free.app',
  '*'
];

app.use(cors({
  origin: allowedOrigins,
   credentials: true
  }
 ))

app.use(express.json());
seed();

app.use((req, res, next) => {
  req.logMeta = {
    route: req.originalUrl || req.url,
    method: req.method,
    data: req.body && Object.keys(req.body).length
      ? req.body
      : req.params && Object.keys(req.params).length
        ? req.params
        : req.query || {}
  };
  req.BaseData = {
    route: req.originalUrl || req.url,
    method: req.method,
  };
  next();
});
const port=process.env.PORT || 5000;

console.log(port);

app.use('/api', sweggerUi.serve, sweggerUi.setup(specs));
app.use('/user', route);
app.use("/",chain);
dbConnect();
// node();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
