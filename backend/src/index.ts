import express from 'express'
import dotenv from 'dotenv'
import connectDB from './mongodb/mongodb'
import menuRouter from './routes/menuRoutes'
import orderRouter from './routes/orderRouter'

import cors from 'cors'

dotenv.config();

const app = express();

// Use a simpler CORS configuration for development
app.use(cors({
  origin: '*', // Allow all origins in development
  credentials: true
}));

app.use(express.json());

// API routes
app.use('/menu', menuRouter);
app.use('/order', orderRouter);


// Health check endpoint
app.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
