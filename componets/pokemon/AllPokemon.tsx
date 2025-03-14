import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";

export const AllPokemon = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [dataPokemon, setDataPokemon] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // 🆕 คำค้นหา
    const [filteredPokemon, setFilteredPokemon] = useState([]); // 🆕 ข้อมูลที่ถูกกรอง
    const [page, setPage] = useState(1);
    const limit = 8;

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                setIsLoading(true); // เริ่มโหลดข้อมูล
                let offset = (page - 1) * limit;
                let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
                let data = await response.json();

                let detailedData = await Promise.all(
                    data.results.map(async (pokemon) => {
                        let res = await fetch(pokemon.url);
                        let details = await res.json();
                        return {
                            name: details.name,
                            image: details.sprites.front_default,
                            type: details.types.map((t) => t.type.name).join(", "),
                            height: details.height,
                            weight: details.weight,
                        };
                    })
                );

                setDataPokemon(detailedData);
                setFilteredPokemon(detailedData);
            } catch (error) {
                console.log("error ja..", error);
            } finally {
                setIsLoading(false); // โหลดข้อมูลเสร็จแล้ว
            }
        };

        fetchPokemonList();
    }, [page]);


    // 🆕 ฟังก์ชันค้นหาข้อมูลเมื่อกดปุ่ม
    const handleSearch = () => {
        const result = dataPokemon.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPokemon(result);
    };

    const handleReset = () => {
        setSearchTerm("");
        setFilteredPokemon(dataPokemon); // รีเซ็ตข้อมูลที่กรองให้กลับมาเป็นค่าเริ่มต้น
    };

    console.log(filteredPokemon)

    return (
        <div className="container mx-auto">
            <div className="text-2xl flex gap-5 font-bold mb-4 ">
                All Pokemon
                <div className="flex items-center gap-2 ">
                    <input
                        type="search"
                        className="input input-bordered p-2 border rounded-md"
                        placeholder="Search Pokemon..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch} className="btn btn-accent btn-active rounded-sm
                    hover:opacity-90
                    ">
                        Confirm
                    </button>
                    <button onClick={handleReset} className="btn btn-accent btn-active rounded-sm
                    hover:opacity-90">
                        Default
                    </button>
                </div>
            </div>
            <>
                {isLoading ? (
                    <div
                        className="h-[30rem] flex  flex-col gap-4 items-center justify-center shadow-sm shadow-accent rounded-md">
                        <span className="loading loading-spinner text-warning h-20 w-20"></span>
                        Loading .. .
                    </div>
                ) : (
                    <div>
                        {/* ถ้าค้นหาไม่เจอ ให้ขึ้นข้อความ */}
                        {filteredPokemon.length === 0 ? (
                            <div
                                className="text-center  h-96 flex items-center justify-center text-red-500 text-lg font-bold">❌
                                ไม่พบข้อมูลโปเกมอน
                            </div>
                        ) : (
                            <div className="grid grid-cols-4 gap-4 ">
                                {filteredPokemon.map((pokemon, index) => (
                                    <Link key={index} href={`/pokemon/${pokemon.name}`} passHref
                                          className="hover:bg-accent/10 ">
                                        <div
                                            key={index}
                                            className="border-2 flex flex-col items-center justify-center cursor-pointer rounded-md shadow-sm">
                                            <figure>
                                                <Image
                                                    className="mt-5"
                                                    width={100}
                                                    height={100}
                                                    src={pokemon.image}
                                                    alt={pokemon.name}
                                                    loading="lazy"
                                                    placeholder="blur" // ใช้ placeholder เป็น blur
                                                    blurDataURL={pokemon.image} // ใช้ image URL ของคุณเป็นข้อมูลเบลอ
                                                />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title text-sm badge rounded-md badge-accent ">{pokemon.name}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* ปุ่ม Pagination */}
                        {filteredPokemon.length > 0 && (
                            <div className="flex items-center justify-center gap-4 mt-6">
                                <button
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="btn btn-accent btn-active hover:scale-105 transform transition duration-300 ease-in-out"
                                >
                                    Previous
                                </button>

                                <span className="text-lg">Page {page}</span>

                                <button
                                    onClick={() => setPage((prev) => prev + 1)}
                                    className="btn btn-accent btn-active hover:scale-105 transform transition duration-300 ease-in-out"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </>
        </div>
    );
};
