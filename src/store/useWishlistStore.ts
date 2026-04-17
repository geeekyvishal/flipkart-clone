import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WishlistItem = {
  id: number;
  title: string;
  price: string;
  numericPrice: number;
  image: string;
  rating?: number;
  reviews?: number;
};

interface WishlistState {
  items: WishlistItem[];
  toggleItem: (product: any) => void;
  removeItem: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      toggleItem: (product) => set((state) => {
        const exists = state.items.some(item => item.id === product.id);
        if (exists) {
          return { items: state.items.filter(item => item.id !== product.id) };
        }
        
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
            rating: product.rating,
            reviews: product.reviews
          }] 
        };
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId);
      }
    }),
    {
      name: 'flipkart-wishlist-storage',
    }
  )
);
