import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { productsById } from "../data/products";
import type { CartItem, Product } from "../types";

const STORAGE_KEY = "sakura-cart";

type CartEntry = {
  item: CartItem;
  product: Product;
};

type CartContextValue = {
  items: CartItem[];
  entries: CartEntry[];
  subtotal: number;
  totalCount: number;
  addItem: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const readStoredCart = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => productsById.has(item.productId))
      .map((item) => ({
        productId: item.productId,
        quantity: Math.max(1, Math.min(99, Number(item.quantity) || 1)),
      }));
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (!existing) {
        return [...current, { productId, quantity: Math.max(1, quantity) }];
      }

      return current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
          : item,
      );
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((item) => item.productId !== productId);
      }

      return current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, Math.min(99, quantity)) }
          : item,
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const entries = useMemo(
    () =>
      items
        .map((item) => {
          const product = productsById.get(item.productId);
          return product ? { item, product } : undefined;
        })
        .filter((entry): entry is CartEntry => Boolean(entry)),
    [items],
  );

  const subtotal = useMemo(
    () => entries.reduce((sum, entry) => sum + entry.product.price * entry.item.quantity, 0),
    [entries],
  );

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      entries,
      subtotal,
      totalCount,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [addItem, clearCart, entries, items, removeItem, subtotal, totalCount, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used within CartProvider");
  }
  return value;
};
