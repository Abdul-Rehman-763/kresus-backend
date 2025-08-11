const express = require('express');
const dbConnect=require('./src/config/dbconnection')
const cors=require('cors');

require('dotenv').config();
const {seed}=require('./src/config/seeds/seed');
const  route = require('./src/routers/user');
const chain=require('./src/routers/chains')
const {specs,sweggerUi}=require('./src/config/swagger');
const app=express();
const allowedOrigins = [
  'http://localhost:5000',
  'https://d754523f031a.ngrok-free.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  next();
});
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
