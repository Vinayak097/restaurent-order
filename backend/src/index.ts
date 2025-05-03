import express from 'express'
import dotenv from 'dotenv'
import connectDB from './mongodb/mongodb'
import menuRouter from './routes/menuRoutes'
import orderRouter from './routes/orderRouter'

import cors from 'cors'

dotenv.config();

// Allow multiple origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://digital-diner.netlify.app' // Add your Netlify URL here when deployed
];

const app = express();

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// API routes
app.use('/menu', menuRouter);
app.use('/order', orderRouter);


// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
