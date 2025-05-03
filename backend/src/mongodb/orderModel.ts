import mongoose, { Document, Model } from 'mongoose';

// Define interfaces
export interface IOrderItem {
  menuItemId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface IOrder extends Document {
  userName: string;
  phoneNumber: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  orderItems: IOrderItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Order Item Schema
const orderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  }
});

// Order Schema
const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING'
  },
  orderItems: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Ensure we don't have duplicate model
let Order: Model<IOrder>;
try {
  Order = mongoose.model<IOrder>('Order');
} catch (e) {
  Order = mongoose.model<IOrder>('Order', orderSchema);
}

export default Order;
