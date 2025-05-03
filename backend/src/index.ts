import express from 'express'
import dotenv from 'dotenv'
import connectDB from './mongodb/mongodb'
import menuRouter from './routes/menuRoutes'
import orderRouter from './routes/orderRouter'

import cors from 'cors'

dotenv.config();

const app = express();

// CORS configuration - Allow all origins for simplicity
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API routes
app.use('/menu', menuRouter);
app.use('/order', orderRouter);


// Health check endpoint
app.get('/', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get('/api/test', (_req, res) => {
  res.status(200).json({
    message: 'API is working correctly',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'The requested resource does not exist' });
});

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: err.name || 'InternalServerError',
    message: err.message || 'Something went wrong on the server'
  });
});

const PORT = process.env.PORT || 3000;

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
