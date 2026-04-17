import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: number;
  title: string;
  price: string;
  numericPrice: number;
  image: string;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  savedItems: CartItem[];
  addItem: (product: any) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  saveForLater: (productId: number) => void;
  moveToCart: (productId: number) => void;
  removeSavedItem: (productId: number) => void;
  // Computed values
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalDiscount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      savedItems: [],
      
      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        
        // Map product to CartItem, extracting first image safely
        const image = Array.isArray(product.images) && product.images.length > 0 
          ? product.images[0] 
          : product.image;
          
        return { 
          items: [...state.items, { 
            id: product.id, 
            title: product.title, 
            price: product.price, 
            numericPrice: product.numericPrice, 
            image: image, 
            quantity: 1 
          }] 
        };
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      })),
      
      clearCart: () => set({ items: [] }),

      saveForLater: (productId) => set((state) => {
        const itemToSave = state.items.find(item => item.id === productId);
        if (!itemToSave) return state;
        return {
          items: state.items.filter(item => item.id !== productId),
          savedItems: [...(state.savedItems || []), itemToSave]
        };
      }),

      moveToCart: (productId) => set((state) => {
        const itemToMove = state.savedItems?.find(item => item.id === productId);
        if (!itemToMove) return state;
        
        const existingInCart = state.items.find(item => item.id === productId);
        return {
          savedItems: state.savedItems.filter(item => item.id !== productId),
          items: existingInCart 
            ? state.items.map(item => item.id === productId ? { ...item, quantity: item.quantity + itemToMove.quantity } : item)
            : [...state.items, itemToMove]
        };
      }),

      removeSavedItem: (productId) => set((state) => ({
        savedItems: state.savedItems?.filter(item => item.id !== productId) || []
      })),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.numericPrice * item.quantity), 0);
      },
      
      // Simulated static mock discount math for demonstration (10% flat off cart logic if desired, or calculated from oldPrice)
      // Since oldPrice isn't directly a number in our mock without parsing strings, we'll assign a flat dynamic discount for UI realism.
      getTotalDiscount: () => {
        const total = get().getTotalPrice();
        return Math.floor(total * 0.15); // 15% aggregate discount
      }
    }),
    {
      name: 'flipkart-cart-storage', // saves to local storage
    }
  )
);
