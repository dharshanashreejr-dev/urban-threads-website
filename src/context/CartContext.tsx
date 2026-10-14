import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import type { Product } from '../data/products';

export type CartItem = {
  product: Product;
  size: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, size: string, qty?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: Product, size: string, qty: number = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { product, size, qty }];
    });
  }

  function removeFromCart(productId: string, size: string) {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
  }

  function updateQty(productId: string, size: string, qty: number) {
    if (qty <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId && i.size === size ? { ...i, qty } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [items]
  );

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, clearCart, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
