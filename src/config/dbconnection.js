// const mongoose = require('mongoose');
// require('dotenv').config();

// const dbConnect = async () => {
//     try{
//    const connected= await mongoose.connect(process.env.STRING)

//         console.log('Database connected successfully',connected)
//     }
//      catch (error) {
//             console.error('Database connection failed:', error);
//         }
//     }


// module.exports = dbConnect;

const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = async() => {
  if (!process.env.MONGO_DB_URL || !process.env.MONGO_DB_NAME) {
    console.error('Database connection details are missing in the environment variables.');
    return;
  }
  // console.log(process.env)
  console.log('Connecting to MongoDB...');
   mongoose.connect(process.env.MONGO_DB_URL, { dbName: process.env.MONGO_DB_NAME });
  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
}
module.exports = dbConnect;