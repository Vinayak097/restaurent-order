import mongoose from 'mongoose';



// MongoDB - menuItem.model.js


const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Appetizers', 'Main Courses', 'Desserts', 'Drinks'], required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);


const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
