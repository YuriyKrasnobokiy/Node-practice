const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'Документація API',
    },
  },
  apis: ['./index.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
