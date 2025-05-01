import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
}

// Define cart store state and actions
interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  getSubtotal: () => number;
  clearCart: () => void;
  getItemQuantity:(id:string)=>number;
}

// Create cart store with persistence
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        // Test data - remove in production
        {
          id: '1',
          name: 'Cheeseburger',
          price: 8.99,
          quantity: 2,
          description: 'Juicy beef patty with cheese, lettuce, and tomato',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop'
        },
        {
          id: '2',
          name: 'French Fries',
          price: 3.99,
          quantity: 1,
          description: 'Crispy golden fries with sea salt',
          image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&h=500&fit=crop'
        }
      ],
      getItemQuantity: (id: string) => {
        const { items } = get();
        const item = items.find(item => item.id === id);
        return item ? item.quantity : 0;
      },
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        
        if (existingItem) {
          // Increase quantity if item already exists
          return {
            items: state.items.map(i => 
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          };
        } else {
          // Add new item with quantity 1
          return {
            items: [...state.items, { ...item, quantity: 1 }]
          };
        }
      }),
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      
      getSubtotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },
      
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'cart-storage', 
    }
  )
)