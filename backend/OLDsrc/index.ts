import express, { Application } from 'express';

import bodyParser from 'body-parser';

import adminRoutes from './routes/adminRoutes';

import clientRoutes from './routes/clientRoutes';

import dotenv from 'dotenv';



// Load environment variables

dotenv.config();



const app: Application = express();



// Middleware

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



// Routes

app.use('/api/admin', adminRoutes);

app.use('/api/client', clientRoutes);



// Health check endpoint

app.get('/', (req, res) => {

  res.status(200).json({ message: 'API is running!' });

});



// Error handler middleware

app.use((err: any, req: any, res: any, next: any) => {

  console.error(err.stack);

  res.status(500).json({ message: 'Internal Server Error', error: err.message });

});



export default app;




