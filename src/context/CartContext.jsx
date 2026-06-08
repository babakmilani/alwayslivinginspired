// src/context/CartContext.jsx
import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [toast, setToast] = useState(null);

    const addItem = useCallback((product) => {
        setItems((prev) => [...prev, product]);
        setToast(`${product.name} added to your bag`);
        setTimeout(() => setToast(null), 1800);
    }, []);

    return (
        <CartContext.Provider value={{ items, count: items.length, addItem, toast }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);