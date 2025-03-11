'use client'
import Image from "next/image";
import {AllPokemon} from "@/componets/pokemon/AllPokemon";

export default function Home() {

  return (
      <div className="p-5">
          <AllPokemon/>
      </div>
  );
}
