import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management System API',
      version: '1.0.0',
      description: 'Production-grade User Management REST API',
    },
    servers: [{ url: '/api/v1', description: 'API v1' }],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            primaryMobile: { type: 'string' },
            secondaryMobile: { type: 'string', nullable: true },
            aadhaar: { type: 'string' },
            pan: { type: 'string' },
            dateOfBirth: { type: 'string', format: 'date' },
            placeOfBirth: { type: 'string' },
            currentAddress: { type: 'string' },
            permanentAddress: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);