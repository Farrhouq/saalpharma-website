import useSWR from "swr";

export interface CartItem {
  name: string;
  image?: string;
  quantity: number;
}

const CART_KEY = "pharmacy-cart";

export function useCart() {
  const { data: cart = [], mutate } = useSWR<CartItem[]>(
    CART_KEY,
    () => {
      if (typeof window === "undefined") return [];
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const updateCart = (newCart: CartItem[]) => {
    mutate(newCart, false);
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
    }
  };

  const addToCart = (product: any, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.name === product.name);
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
      updateCart(newCart);
    } else {
      updateCart([
        ...cart,
        {
          name: product.name,
          image: product.image,
          quantity,
        },
      ]);
    }
  };

  const removeFromCart = (name: string) => {
    updateCart(cart.filter((item) => item.name !== name));
  };

  const updateQuantity = (name: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(name);
      return;
    }
    updateCart(
      cart.map((item) => (item.name === name ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    updateCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems: cart.reduce((acc, item) => acc + item.quantity, 0),
  };
}
