// const express = require('express');
// const dbConnect=require('./src/config/dbconnection')
// const app=express();
// require('dotenv').config();
// app.use(express.json());

// const sweggerJSdocs= require("swagger-jsdoc");
// const sweggerUi=require("swagger-ui-express");
// const  route = require('./src/routers/user');

// const port=process.env.PORT || 5001;
// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "User API",
//             version: "1.0.0",
//             description: "API for user verification and code handling"
//         },
//         servers: [
//             {
//                 url: `http://localhost:${port}`
//             }
//         ]
//     },
//     apis: ['./src/routers/user.js']
// };
// console.log(port);
// const specs=sweggerJSdocs(options);
// app.use('/api-docs', sweggerUi.serve, sweggerUi.setup(specs));
// app.use('/user', route);
// dbConnect();

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const serverless = require('serverless-http');
const dbConnect=require('./src/config/dbconnection')
require('dotenv').config();

const app = express();
app.use(express.json());

// Swagger setup
const swaggerJSdocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const route = require('./src/routers/user');

const port = process.env.PORT || 5001;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API for user verification and code handling"
    },
    servers: [
      {
        url: `http://localhost:${port}` // Only used in Swagger UI
      }
    ]
  },
  apis: ['./src/routers/user.js']
};

const specs = swaggerJSdocs(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/user', route);

// Connect to database
dbConnect();

// Export as serverless function for Vercel
module.exports = serverless(app);
