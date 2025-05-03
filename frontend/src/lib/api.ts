import axios from 'axios';

// Use environment variable for backend URL or default to localhost for development
const backendUrl = import.meta.env.VITE_API_URL || 'https://restaurent-order-kfo1.vercel.app';

// Define interfaces
interface OrderItem {
   menuItemId: string;
   quantity: number;
}

interface OrderPayload {
    orderItems: OrderItem[];
}

interface UserPayload {
    name: string;
    phone_number: string;
}

// API functions
export async function getMenuItems(category: string, limit: number = 9, page: number = 1) {
    try {
        // Convert frontend category ID to backend category value
        let categoryParam = category;
        if (category === 'appetizers') categoryParam = 'Appetizers';
        if (category === 'main-courses') categoryParam = 'Main Courses';
        if (category === 'desserts') categoryParam = 'Desserts';
        if (category === 'drinks') categoryParam = 'Drinks';

        const url = `${backendUrl}/menu?category=${categoryParam === 'all' ? '' : categoryParam}&limit=${limit}&page=${page}`;
        const res = await fetch(url);

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

export async function createUser(data: UserPayload) {
    try {
        const response = await axios.post(`${backendUrl}/user`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function createOrder(data: OrderPayload, token: string) {
    try {
        console.log('Creating order with token:', token);
        console.log('Order data:', data);

        const response = await axios.post(`${backendUrl}/order`, data, {
            headers: {
                'Authorization': token
            }
        });

        console.log('Order creation response:', response.data);
        return response.data;
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

export async function getPastOrders({ limit = 10, page = 1, token }: { limit: number, page: number, token: string }) {
    try {
        console.log('Fetching orders with token:', token);
        console.log('Params:', { limit, page });

        const response = await axios.get(`${backendUrl}/order/getallorders?limit=${limit}&page=${page}`, {
            headers: {
                'Authorization': token
            }
        });

        console.log('Order history response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching past orders:', error);
        throw error;
    }
}