import mongoose from 'mongoose';

const { Schema } = mongoose;

const menuItemSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image_url: { type: String },
  customizations: [
    {
      name: { type: String, required: true },
      options: [
        {
          name: { type: String, required: true },
          price_addition: { type: Number, required: true }
        }
      ]
    }
  ],
  availability: { type: Boolean, default: true },
  nutritional_info: {
    calories: { type: Number },
    allergens: [{ type: String }]
  }
}, {
  timestamps: true
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
