const express = require('express');
const dbConnect=require('./src/config/dbconnection')
const app=express();
require('dotenv').config();
app.use(express.json());

const sweggerJSdocs= require("swagger-jsdoc");
const sweggerUi=require("swagger-ui-express");
const  route = require('./src/routers/user');

const port=process.env.PORT || 5001;
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
                url: `http://localhost:${port}`
            }
        ]
    },
    apis: ['./src/routers/user.js']
};
console.log(port);
const specs=sweggerJSdocs(options);
app.use('/api-docs', sweggerUi.serve, sweggerUi.setup(specs));
app.use('/user', route);
dbConnect();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
