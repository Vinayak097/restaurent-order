import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from '../mongodb/model';

// Load environment variables
dotenv.config();

// Connect to MongoDB and clear menu items
async function clearMenuItems() {
  try {
    await mongoose.connect(process.env.MONGO_DB!);
    console.log('Connected to MongoDB');

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('All menu items have been deleted from MongoDB');

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error clearing menu items:', error);
  }
}

// Run the function
clearMenuItems();
