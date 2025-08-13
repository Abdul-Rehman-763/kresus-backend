const sweggerJSdocs = require("swagger-jsdoc");
const sweggerUi = require("swagger-ui-express");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "API for user email and code handling"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearcerFormat: "JWT",
                },
            },
        },
         security: [
      {
        bearerAuth: []  
      }
    ],
      servers: [
  {
    url: 'https://9e550f388a7e.ngrok-free.app',
    description: 'ngrok tunnel'
  }
]
    },
    apis: ['./src/docs/*.js']
};
exports.specs = sweggerJSdocs(options);
exports.sweggerUi = sweggerUi;

