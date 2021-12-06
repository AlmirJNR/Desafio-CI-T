import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

// Import default controllers and routers
import APIv1Router from '@/controllers/APIv1Router';

// Load the .env
dotenv.config();

/** Set up an instance of express server */
const server = express();

// Add the main middlewares
server.use(helmet()); // To help secure the server
server.use(cors()); // To enable CORS
server.use(express.json()); // To parse the body of the requests as JSON objects

// Set the default router to check if server is up and running
server.get('/', (_, response) => {
  response.json({
    message: 'Almir Junior ToDo List Default Api Response',
  });
});

// Set the API router to use the '/api/v1' route
server.use('/api/v1', APIv1Router);

export default server;
