'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from "next/image";
import {Countdown} from "@/componets/pokemon/Countdown";

const PokemonPage = () => {

    const { id } = useParams<{ id: string }>();

    const [pokemonData, setPokemonData] = useState(null);
    // สร้าง state สำหรับเก็บค่าของ input
    const [inputValue, setInputValue] = useState('');
    const [count, setCount] = useState(0); // สถานะสำหรับค่า range

    // ฟังก์ชันสำหรับปรับค่า value เมื่อคลิก
    const handleClick = (newValue: number) => {
        setCount(newValue);
    };

    // เลือกภาพตามค่าของ count
    const getImage = () => {
        switch (count) {
            case 0:
                return pokemonData.sprites.front_default;
            case 20:
                return pokemonData.sprites.back_default;
            case 40:
                return pokemonData.sprites.front_shiny;
            case 60:
                return pokemonData.sprites.back_shiny;
            default:
                return pokemonData.sprites.front_default;
        }
    };

    // ฟังก์ชันที่ใช้ในการตรวจสอบและอัปเดตค่าใน input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value < 0) {
            e.target.value = 0 as any; // ถ้าค่าติดลบให้ปรับเป็น 0
        }
        setInputValue(value); // อัปเดตค่าของ input
    };


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
        return <div
            className="min-h-screen flex  flex-col gap-4 items-center justify-center  rounded-md">
            <span className="loading loading-spinner text-warning h-20 w-20"></span>
            Loading .. .
        </div>
    }


    return (
        <div className="p-5 ">
            <div className="container relative mx-auto  p-5 rounded-md shadow-sm shadow-accent border-accent">
                <div className="absolute right-14">
                    <Countdown/>
                </div>
                <div className="absolute left-14">
                    <div className="w-full max-w-xs ">
                        <input
                            type="range"
                            min={0}
                            max={60}
                            value={count} // ใช้ค่าจากสถานะ
                            className="range range-accent"
                            step="20"
                            onChange={(e) => setCount(Number(e.target.value))} // แก้ไขค่าเมื่อเลื่อนแถบ
                        />
                        <div className="flex justify-between   mt-2 text-xs bg-rose-500">
                            <span onClick={() => handleClick(20)}></span>
                            <span onClick={() => handleClick(20)}></span>
                            <span onClick={() => handleClick(20)}></span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className=" flex flex-col items-center my-5">
                        <h1 className="text-2xl font-bold">{pokemonData.name}</h1>
                        <Image
                            width={120}
                            height={120}
                            src={getImage()} // ใช้ฟังก์ชันที่เลือกภาพ
                            alt={pokemonData.name}
                            loading="lazy"
                            blurDataURL={pokemonData.image} // ใช้ image URL
                        />
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="card w-96 bg-base-100 shadow-sm shadow-accent hover:bg-accent/10">
                            <div className="card-body flex">
                                <span className="badge badge-xs badge-ghost ">Most Popular</span>
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">Small</h2>
                                    <input
                                        disabled
                                        type="number"
                                        placeholder="Count"
                                        className="input input-sm input-accent shadow-sm shadow-accent w-24"
                                        onInput={(e: any) => {
                                            const value = e.target.value;
                                            if (value < 0) {
                                                e.target.value = 0;
                                            }
                                        }}
                                    />
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
                                <div className="mt-auot">
                                    <button
                                        disabled
                                        className=" btn btn-active btn-accent btn-block hover:opacity-90">Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-sm shadow-accent hover:bg-accent/10">
                            <div className="card-body flex">
                                <span className="badge badge-xs badge-ghost">Most Popular</span>
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">Medium</h2>
                                    <input
                                        disabled
                                        type="number"
                                        placeholder="Count"
                                        className="input input-sm input-accent shadow-sm shadow-accent w-24"
                                        onInput={(e: any) => {
                                            const value = e.target.value;
                                            if (value < 0) {
                                                e.target.value = 0;
                                            }
                                        }}
                                    />
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
                                <div className="mt-auto">
                                    <button
                                        disabled
                                        className="btn btn-active btn-accent btn-block hover:opacity-90"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card  bg-base-100 shadow-sm shadow-accent hover:bg-accent/10">
                            <div className="card-body flex ">
                                <span className="badge badge-xs badge-warning">Most Popular</span>
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold">Premium</h2>
                                    <input
                                        type="number"
                                        placeholder="Count"
                                        className="input input-sm w-24"
                                        value={inputValue} // ให้ค่าของ input มาจาก state
                                        onChange={handleInputChange} // ใช้ onChange เพื่ออัปเดตค่า
                                    />
                                </div>
                                <ul className="mt-6 flex flex-col gap-2 text-xs  ">
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
                                <div className="mt-auto">
                                    <div className="mt-auto">
                                        <button
                                            disabled={!inputValue}
                                            className="btn btn-active btn-accent btn-block hover:opacity-90"
                                        >
                                            Subscribe
                                        </button>
                                    </div>
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
