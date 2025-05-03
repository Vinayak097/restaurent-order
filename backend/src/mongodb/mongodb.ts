import mongoose from 'mongoose'

// Track the connection status
let isConnected = false;

export default async function connectDB() {
    try {
        // If already connected, return early
        if (isConnected) {
            console.log('Using existing MongoDB connection');
            return;
        }

        if (!process.env.MONGO_DB) {
            throw new Error('MONGO_DB environment variable is not defined');
        }

        // Set connection options for better performance in serverless environments
        const options = {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        };

        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_DB, options);

        isConnected = true;
        console.log('Connected to MongoDB successfully');
    } catch (e) {
        console.error('Failed to connect to MongoDB:', e);
        isConnected = false;

        // In production, you might want to exit the process if DB connection fails
        if (process.env.NODE_ENV === 'production') {
            console.error('Exiting due to MongoDB connection failure in production');
            process.exit(1);
        }
    }
}

