"use client"
import React, { useCallback } from 'react'
import { useLocalStorage } from '@mantine/hooks';

type Props = {
    children: React.ReactNode
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  images: {
    src: string
  }[]
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  cartTotal: number
}

export const CartContext = React.createContext<CartContextType | undefined>(undefined)

const CartProvider = ({ children }: Props) => {
  const [items, setItems] = useLocalStorage<CartItem[]>({
    key: 'cart-items',
    defaultValue: []
  });
  
  const [isOpen, setIsOpen] = useLocalStorage<boolean>({
    key: 'cart-is-open',
    defaultValue: false
  });

  const addItem = useCallback((item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((prevItem) => item.id === prevItem.id);
      if (existingItem) {
        return prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? {
                ...prevItem,
                quantity: prevItem.quantity + item.quantity,
              }
            : prevItem
        );
      } else {
        return [...prevItems, item];
      }
    });
    setIsOpen(true);
  }, [setItems, setIsOpen]);
  
  const removeItem = useCallback((productId: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((prevItem) => productId === prevItem.id);
      if (existingItem) {
        return prevItems.filter((prevItem) => prevItem.id !== productId);
      }
      return prevItems;
    });
  }, [setItems]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) => {
      const existingItem = prevItems.find((prevItem) => productId === prevItem.id);
      if (existingItem) {
        return prevItems.map((prevItem) =>
          prevItem.id === productId
            ? {
                ...prevItem,
                quantity: quantity,
              }
            : prevItem
        );
      }
      return prevItems;
    });
  }, [removeItem, setItems]);

  const clearCart = useCallback(() => {
    setItems([]);
    setIsOpen(false);
  }, [setItems, setIsOpen]);

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, isOpen, setIsOpen, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;