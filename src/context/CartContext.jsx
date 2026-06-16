// src/context/CartContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "ali_cart_v1";

const lineKey = (id, size) => `${id}|${size || ""}`;

function loadCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const arr = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(arr)) return [];
        return arr
            .filter((it) => it && it.id)
            .map((it) => ({
                key: it.key || lineKey(it.id, it.size),
                id: it.id,
                vid: it.vid || null,
                name: it.name || "",
                image: it.image || "",
                price: Number(it.price) || 0,
                size: it.size || null,
                category: it.category || "",
                qty: Math.max(1, Number(it.qty) || 1),
            }));
    } catch {
        return [];
    }
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(loadCart);
    const [toast, setToast] = useState(null);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { }
    }, [items]);

    const flash = useCallback((msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 1800);
    }, []);

    // addItem(product, { size, vid, qty }) — merges by product + size.
    const addItem = useCallback((product, opts = {}) => {
        const { size = null, vid = null, qty = 1 } = opts;
        const key = lineKey(product.id, size);
        setItems((prev) => {
            const i = prev.findIndex((it) => it.key === key);
            if (i >= 0) {
                const next = [...prev];
                next[i] = { ...next[i], qty: next[i].qty + qty, vid: vid || next[i].vid };
                return next;
            }
            return [
                ...prev,
                {
                    key,
                    id: product.id,
                    vid,
                    name: product.name,
                    image: product.image || "",
                    price: Number(product.price) || 0,
                    size,
                    category: product.category || "",
                    qty,
                },
            ];
        });
        flash(`${product.name} added to your bag`);
    }, [flash]);

    const updateQty = useCallback((key, qty) => {
        setItems((prev) =>
            prev.flatMap((it) => {
                if (it.key !== key) return [it];
                const q = Math.max(0, qty);
                return q === 0 ? [] : [{ ...it, qty: q }];
            })
        );
    }, []);

    const removeItem = useCallback((key) => {
        setItems((prev) => prev.filter((it) => it.key !== key));
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const count = items.reduce((n, it) => n + it.qty, 0);
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

    const openCart = useCallback(() => setOpen(true), []);
    const closeCart = useCallback(() => setOpen(false), []);

    // Replaced in the Stripe step with a real checkout-session redirect.
    const checkout = useCallback(() => {
        flash("Secure checkout is being set up — coming next.");
    }, [flash]);

    return (
        <CartContext.Provider
            value={{
                items, count, subtotal,
                addItem, updateQty, removeItem, clear,
                toast, isOpen, openCart, closeCart, checkout,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);