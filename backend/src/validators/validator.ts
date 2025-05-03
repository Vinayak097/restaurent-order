import { z } from 'zod';

// User validation schema
export const userSchema = z.object({
    name: z.string().min(2).max(100),
    phone_number: z.string().min(10).max(15)
});

// Order validation schema
export const orderItemSchema = z.object({
    menuItemId: z.string().min(1),
    quantity: z.number().int().positive()
});

export const orderSchema = z.object({
    orderItems: z.array(orderItemSchema).min(1)
});