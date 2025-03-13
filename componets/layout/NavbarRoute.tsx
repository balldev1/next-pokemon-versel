'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { signOut } from "next-auth/react";

export const NavbarRoute = () => {
    const pathname = usePathname();

    const handleLogout = async () => {
        // เรียกใช้งาน signOut ของ NextAuth เพื่อ logout
        await signOut({
            callbackUrl: '/login' // หรือ URL ที่คุณต้องการให้กลับไปหลังจาก logout
        });
    };

    return (
        <>
            {pathname !== '/login' && (
                <div className="navbar sticky top-0 bg-base-100 shadow-sm">
                    <div className="flex-1">
                        <Link href='/'
                              className="btn btn-ghost text-xl">API Pokemon</Link>
                    </div>
                    <div className="flex gap-2">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-md shadow-sm shadow-accent">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link href='/cart' className="justify-between">
                                        Cart
                                        <span className="px-2 rounded-sm bg-lime-400 text-[12px]">product</span>
                                    </Link>
                                </li>
                                <li><a>Settings</a></li>
                                <li>
                                    <a onClick={handleLogout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
