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
        url: 'http://13.213.72.15:5000',
        description: 'Production Server'
      },
      {
        url: 'http://localhost:5000',
        description: 'Local Development Server'
      },
      {
        url: 'https://your-ngrok-url.ngrok.io',
        description: 'Ngrok Tunnel'
      }
    ]
  },
  apis: ['./src/docs/*.js']
};
exports.specs = sweggerJSdocs(options);
exports.sweggerUi = sweggerUi;

