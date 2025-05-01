import axios from 'axios'
import { error } from 'console';

const backendUrl = 'http://localhost:3000'

// Define interfaces
interface OrderItem {
   menuItemId: string;
   quantity: number;
}

interface OrderPayload {
    orderItems: OrderItem[];
}

// API functions
export async function getMenuItems(category: string) {
    try {
        // const response = await axios.get(`${backendUrl}/menu?category=${category}`);
        const res = await fetch(`${backendUrl}/menu?category=${category}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const result = await res.json();
    return result.menu;
        
    } catch (error) {
        console.error('Error fetching menu items:', error);
        return [];
    }
}

export async function createOrder(data: OrderPayload) {
    try {
        const response = await axios.post(`${backendUrl}/order`, data);
        return response.data.message;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

export async function getMenuItem(id: string) {
    try {
        const response = await axios.get(`${backendUrl}/menu/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching menu item:', error);
        throw error;
    }
}

export async function getPastOrders({ limit = 10, page = 1 }: { limit: number, page: number }) {
    try {
        const response = await axios.get(`${backendUrl}/order/getallorders?limit=${limit}&page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching past orders:', error);
        throw error;
    }
}