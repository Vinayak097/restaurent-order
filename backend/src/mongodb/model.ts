import mongoose, { Document, Model } from 'mongoose';

// Define MenuItem interface
export interface IMenuItem extends Document {
  name: string;
  category: 'Appetizers' | 'Main Courses' | 'Desserts' | 'Drinks';
  description?: string;
  price: number;
  imageUrl?: string;
  available: boolean;
  _id: mongoose.Types.ObjectId | string;
}

// MongoDB - menuItem.model.js
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Appetizers', 'Main Courses', 'Desserts', 'Drinks'], required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  available: { type: Boolean, default: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Ensure we don't have duplicate model
let MenuItem: Model<IMenuItem>;
try {
  MenuItem = mongoose.model<IMenuItem>('MenuItem');
} catch (e) {
  MenuItem = mongoose.model<IMenuItem>('MenuItem', menuItemSchema);
}

export default MenuItem;
