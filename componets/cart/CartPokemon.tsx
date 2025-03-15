'use client'
import { useCartStore } from "@/stores/useStore";

export const CartPokemon = () => {
    const { items } = useCartStore();

    return (
        <div className="bg-rose-500 p-4">
            <h2 className="text-xl font-bold">Cart Items</h2>
            <ul>
                {items.map((pokemon, index) => (
                    <li key={index} className="flex items-center space-x-4 py-2">
                        <img src={pokemon.image} alt={pokemon.name} className="w-16 h-16" />
                        <div>
                            <h3 className="text-lg font-medium">{pokemon.name}</h3>
                            <p className="text-sm">Quantity: {pokemon.quantity}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
