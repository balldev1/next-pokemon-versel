'use client'
import { useEffect } from "react";
import { useCartStore } from "@/stores/useStore";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const CartPokemon = () => {
    const { items, updateQuantity, removeItem, clearCart } = useCartStore();
    const router = useRouter();

    // คำนวณผลรวมของ quantity ทั้งหมด
    const totalQuantity = items.reduce((sum, pokemon) => sum + pokemon.quantity, 0);

    // ตรวจสอบหากไม่มี items ให้แสดง Swal และเปลี่ยนเส้นทางไปหน้า "/"
    useEffect(() => {
        if (items.length === 0) {
            Swal.fire({
                title: "ไม่มี Pokemon ในตะกร้า!",
                text: "กำลังนำคุณกลับไปที่หน้าหลัก...",
                icon: "info",
                timer: 3000,
                showConfirmButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading(); // แสดงไอคอนโหลด
                },
                willClose: () => {
                    router.push("/");
                }
            });
        }
    }, [items, router]);

    // ฟังก์ชันแสดง Swal ยืนยันก่อนลบรายการเดียว
    const confirmRemoveItem = (name: string) => {
        Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: `คุณต้องการลบ ${name} ออกจากตะกร้าใช่หรือไม่?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ใช่, ลบเลย!",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if (result.isConfirmed) {
                removeItem(name);
                Swal.fire("ลบแล้ว!", `${name} ถูกลบออกจากตะกร้า`, "success");
            }
        });
    };

    // ฟังก์ชันแสดง Swal ยืนยันก่อนล้างทั้งหมด
    const confirmClearCart = () => {
        Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: "คุณต้องการล้างตะกร้าทั้งหมดใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ใช่, ล้างทั้งหมด!",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                Swal.fire("ล้างสำเร็จ!", "ตะกร้าของคุณถูกล้างเรียบร้อย", "success");
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Cart Items</h2>

            {/* Table */}
            <div className="overflow-x-auto rounded-md shadow shadow-accent">
                <table className="min-w-full shadow-sm rounded-md">
                    <thead>
                    <tr className="text-left border-b-[1px] border-accent">
                        <th className="px-4 py-2">Order</th>
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((pokemon, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100 border-accent">
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">
                                <img src={pokemon.image} alt={pokemon.name} className="w-12 h-12" />
                            </td>
                            <td className="px-4 py-2">{pokemon.name}</td>
                            <td className="px-4 py-2">
                                <input
                                    type="number"
                                    className="input input-accent w-20 bg-white rounded-sm border-2 border-accent shadow-sm shadow-accent"
                                    value={pokemon.quantity}
                                    onChange={(e) => updateQuantity(pokemon.name, Number(e.target.value))}
                                    min={1}
                                />
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => confirmRemoveItem(pokemon.name)}
                                    className="bg-red-600 text-white p-2 rounded hover:opacity-90 cursor-pointer shadow-sm shadow-accent"
                                >
                                    remove
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Total & Clear Button */}
            <div className="flex justify-between mt-5">
                <div>
                    <button
                        onClick={confirmClearCart}
                        className="bg-red-600 text-white p-2 cursor-pointer rounded-md shadow-md hover:opacity-90 shadow-sm shadow-accent"
                    >
                        🗑️ Clear All
                    </button>
                </div>
                <div className="flex items-center gap-4 p-2 border-2 border-accent rounded-md shadow-md shadow-accent">
                    🔥 Total Subscription Pokemon
                    <div className="bg-white p-2 rounded-sm shadow-md shadow-accent text-accent">
                        {totalQuantity}
                    </div>
                </div>
            </div>
        </div>
    );
};
