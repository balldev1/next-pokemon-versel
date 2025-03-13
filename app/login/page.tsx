'use client'
import {AuthCard} from "@/componets/login/AuthCard";
import { useSession } from "next-auth/react";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const LoginPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter(); // ใช้ useRouter เพื่อทำการ redirect

    useEffect(() => {
        // ถ้ามี session ให้ redirect ไปหน้า '/'
        if (session) {
            router.push('/'); // ใช้ router.push() เพื่อเปลี่ยนหน้า
        }
    }, [session, router]); // ตรวจสอบ session และ router ใน useEffect

    return (
        // เงื่อนไขนี้จะตรวจสอบว่า session เป็น null หรือไม่
        session === null && (
            <div className="flex items-center justify-center">
                <AuthCard />
            </div>
        )
    );
}

export default LoginPage;