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
      items: [], // Empty cart by default
      getItemQuantity: (id: string) => {
        const { items } = get();
        const item = items.find(item => item.id === id);
        return item ? item.quantity : 0;
      },
      addItem: (item) => {
        // Validate MongoDB ID
        if (!item.id || !/^[0-9a-fA-F]{24}$/.test(item.id)) {
          console.error("Invalid MongoDB ID in addItem:", item.id);
          return;
        }

        set((state) => {
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
        });
      },

      updateQuantity: (id, quantity) => {
        // Validate MongoDB ID
        if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
          console.error("Invalid MongoDB ID in updateQuantity:", id);
          return;
        }

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

      removeItem: (id) => {
        // Validate MongoDB ID
        if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
          console.error("Invalid MongoDB ID in removeItem:", id);
          return;
        }

        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },

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