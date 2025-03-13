'use client'

import { AllPokemon } from "@/componets/pokemon/AllPokemon";
import { useSession } from "next-auth/react";

export default function Home() {

    const { data: session, status } = useSession();
    return (
        <div className="p-5">
            {session?.user?.email}
            <AllPokemon />
        </div>
    );
}
