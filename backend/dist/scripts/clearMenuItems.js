"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const model_1 = __importDefault(require("../mongodb/model"));
// Load environment variables
dotenv_1.default.config();
// Connect to MongoDB and clear menu items
async function clearMenuItems() {
    try {
        await mongoose_1.default.connect(process.env.MONGO_DB);
        console.log('Connected to MongoDB');
        // Clear existing menu items
        await model_1.default.deleteMany({});
        console.log('All menu items have been deleted from MongoDB');
        // Close the connection
        await mongoose_1.default.connection.close();
        console.log('MongoDB connection closed');
    }
    catch (error) {
        console.error('Error clearing menu items:', error);
    }
}
// Run the function
clearMenuItems();
