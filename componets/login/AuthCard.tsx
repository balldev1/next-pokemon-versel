'use client';
import { useState } from "react";
import { z } from "zod";

// สร้าง Schema โดยใช้ Zod
const loginSchema = z.object({
    email: z.string().min(1, 'Email is required'), // ตรวจสอบว่า email เป็น string และไม่ว่าง
    password: z.string().min(6, 'Password must be at least 6 characters'), // ตรวจสอบว่า password ต้องยาวอย่างน้อย 6 ตัว
});

export const AuthCard = () => {
    const [isLogin, setIsLogin] = useState(true); // สถานะสำหรับสลับระหว่าง Login และ Register
    const [email, setEmail] = useState(""); // เก็บค่า email
    const [password, setPassword] = useState(""); // เก็บค่า password
    const [error, setError] = useState(""); // เก็บข้อความ error

    const handleToggleLogin = () => {
        // สลับสถานะ isLogin และเคลียร์ค่าของ input และ error
        setIsLogin(!isLogin);
        setEmail(""); // เคลียร์ค่า email
        setPassword(""); // เคลียร์ค่า password
        setError(""); // เคลียร์ข้อความ error
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // ตรวจสอบข้อมูลโดยใช้ Zod schema
        try {
            // ตรวจสอบข้อมูลจากฟอร์ม
            loginSchema.parse({ email, password });
            setError(""); // ถ้าผ่านการตรวจสอบให้ลบ error
            // ใส่ logic สำหรับการ login หรือ register ที่นี่
            console.log("Email:", email);
            console.log("Password:", password);

            // คุณสามารถเพิ่มการเรียก API สำหรับ login/register ได้ที่นี่

        } catch (err) {
            if (err instanceof z.ZodError) {
                // ถ้ามี error ให้แสดง
                setError(err.errors[0].message);
            }
        }
    };

    return (
        <>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md flex flex-col justify-center items-center w-96">
                        <h1 className="mb-5 text-5xl font-bold">{isLogin ? "Login" : "Register"}</h1>
                        <p className="mb-5">
                            {isLogin
                                ? "Login as ApiPokemon."
                                : "Create an account to get started."}
                        </p>
                        <div className="card bg-base-100 shadow-lg shadow-accent w-full shrink-0 shadow-2xl ">
                            <div className="card-body">
                                <fieldset className="fieldset">
                                    <label className="fieldset-label">Email</label>
                                    <input
                                        type="email"
                                        className="input w-full placeholder:text-accent"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label className="fieldset-label">Password</label>
                                    <input
                                        type="password"
                                        className="input w-full placeholder:text-accent"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div>
                                        <a
                                            onClick={handleToggleLogin}
                                            className="link link-hover text-accent"
                                        >
                                            {isLogin ? "Don't have an account? Register here" : "Already have an account? Login"}
                                        </a>
                                    </div>
                                    <button className="btn btn-neutral mt-4" onClick={handleSubmit}>
                                        {isLogin ? "Login" : "Register"}
                                    </button>
                                    {error && <p className="text-red-500 mt-2">{error}</p>}
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
