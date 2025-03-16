import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    name: string;
    quantity: number;
    image: string;
}

interface StoreState {
    items: CartItem[];
    addItem: (name: string, quantity: number, pokemonId: number) => void;
    updateQuantity: (name: string, quantity: number) => void; // ฟังก์ชันใหม่
    removeItem: (name: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<StoreState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (name, quantity, pokemonId) => {
                const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

                set((state) => {
                    const existingItemIndex = state.items.findIndex((item) => item.name === name);

                    if (existingItemIndex !== -1) {
                        // ถ้ามีอยู่แล้ว, เพิ่มจำนวน
                        const updatedItems = [...state.items];
                        updatedItems[existingItemIndex] = {
                            ...updatedItems[existingItemIndex],
                            quantity: updatedItems[existingItemIndex].quantity + quantity,
                        };
                        return { items: updatedItems };
                    } else {
                        // ถ้าไม่มี, เพิ่มเข้าไปใหม่
                        return { items: [...state.items, { name, quantity, image: imageUrl }] };
                    }
                });
            },
            updateQuantity: (name, quantity) => {
                set((state) => ({
                    items: state.items.map(item =>
                        item.name === name ? { ...item, quantity } : item
                    ),
                }));
            },
            removeItem: (name) => {
                set((state) => ({
                    items: state.items.filter(item => item.name !== name),
                }));
            },
            clearCart: () => {
                set({ items: [] });
            },
        }),
        {
            name: "cart-storage", // key ที่ใช้ใน LocalStorage
        }
    )
);
