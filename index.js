const express = require('express');
const dbConnect=require('./src/config/dbconnection')
const cors=require('cors');

require('dotenv').config();
const {seed}=require('./src/config/seeds/seed');
const  route = require('./src/routers/user');
const chain=require('./src/routers/chains')
const {specs,sweggerUi}=require('./src/config/swagger');
const app=express();
const corsOptions = {
  origin: [
    'http://localhost:5000', // Your local dev
    'https://cdb3f96c5a7a.ngrok-free.app', // Current ngrok URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(express.json());
app.use(cors({
  origin : "*",  // Reflects the request origin;
  credentials: true
}));
 const haders=(req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header(
    'Access-Control-Expose-Headers',
    'Content-Disposition, access-token, refresh-token, date, signup-key, content-length, x-decompressed-content-length, Authorization'
  );
  next();
};
app.use(haders)
seed();
const port=process.env.PORT || 5000;

console.log(port);

app.use('/api', sweggerUi.serve, sweggerUi.setup(specs));
app.use('/user', route);
app.use("/",chain);
dbConnect();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
