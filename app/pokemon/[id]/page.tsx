'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from "next/image"; // ใช้ useParams แทนการใช้ useRouter

const PokemonPage = () => {

    const { id } = useParams<{ id: string }>();

    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        // ตรวจสอบว่า 'name' ถูกกำหนดแล้ว
        if (id) {
            const fetchPokemonData = async () => {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const data = await response.json();
                    setPokemonData(data); // เซ็ตข้อมูลที่ได้จาก API
                } catch (error) {
                    console.error('Failed to fetch Pokemon data:', error);
                }
            };

            fetchPokemonData();
        }
    }, [id]); // เมื่อ 'name' เปลี่ยนให้ดึงข้อมูลใหม่

    if (!pokemonData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-5">
            <div className="container mx-auto  p-5 rounded-md shadow-sm shadow-accent border-accent">
                <div >
                    <div className=" flex flex-col items-center my-5">
                        <h1 className="text-2xl font-bold">{pokemonData.name}</h1>
                        <Image
                            width={120}
                            height={120}
                            src={pokemonData.sprites.front_default}
                            alt={pokemonData.name}
                            loading="lazy"
                            blurDataURL={pokemonData.image} // ใช้ image URL ของคุณเป็นข้อมูลเบลอ
                        />
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="card w-96 bg-base-100 shadow-sm shadow-accent">
                            <div className="card-body">
                                <span className="badge badge-xs badge-warning">Most Popular</span>
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">Small</h2>
                                    <span className="text-xl">$29/mo</span>
                                </div>
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-success" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span>High-resolution image generation</span>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-success" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span>Customizable style templates</span>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-success" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span>Batch processing capabilities</span>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-success" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span>AI-driven image enhancements</span>
                                    </li>
                                    <li className="opacity-50">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-base-content/50" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span className="line-through">Seamless cloud integration</span>
                                    </li>
                                    <li className="opacity-50">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-base-content/50" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span className="line-through">Real-time collaboration tools</span>
                                    </li>
                                </ul>
                                <div className="mt-6">
                                    <button className="btn btn-active btn-accent btn-block hover:opacity-90">Subscribe</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-sm shadow-accent">
                            <div className="card-body">
                                <span className="badge badge-xs badge-warning">Most Popular</span>
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">Medium</h2>
                                    <span className="text-xl">$49/mo</span>
                                </div>
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-success" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span>High-resolution image generation</span>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-success" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span>Customizable style templates</span>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-success" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span>Batch processing capabilities</span>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-success" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span>AI-driven image enhancements</span>
                                    </li>
                                    <li className="opacity-50">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-base-content/50" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span className="line-through">Seamless cloud integration</span>
                                    </li>
                                    <li className="opacity-50">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-base-content/50" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span className="line-through">Real-time collaboration tools</span>
                                    </li>
                                </ul>
                                <div className="mt-6">
                                    <button className="btn btn-active btn-accent btn-block hover:opacity-90">Subscribe</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-sm shadow-accent">
                            <div className="card-body">
                                <span className="badge badge-xs badge-warning">Most Popular</span>
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">Premium</h2>
                                    <span className="text-xl">$59/mo</span>
                                </div>
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-success" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span>High-resolution image generation</span>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-success" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span>Customizable style templates</span>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-success" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span>Batch processing capabilities</span>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-success" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span>AI-driven image enhancements</span>
                                    </li>
                                    <li className="opacity-50">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-base-content/50" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span className="line-through">Seamless cloud integration</span>
                                    </li>
                                    <li className="opacity-50">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="size-4 me-2 inline-block text-base-content/50" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span className="line-through">Real-time collaboration tools</span>
                                    </li>
                                </ul>
                                <div className="mt-6">
                                    <button className="btn btn-active btn-accent btn-block hover:opacity-90">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PokemonPage;
