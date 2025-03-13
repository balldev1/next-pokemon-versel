'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { signIn } from "next-auth/react"; // ใช้ signIn จาก NextAuth

// สร้าง Schema โดยใช้ Zod
const loginSchema = z.object({
    email: z.string().min(1, "Email is required"), // แค่ string ที่ไม่ว่าง
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const AuthCard = () => {
    const [isLogin, setIsLogin] = useState(true); // สถานะสำหรับสลับระหว่าง Login และ Register
    const [email, setEmail] = useState(""); // เก็บค่า Email
    const [password, setPassword] = useState(""); // เก็บค่า password
    const [error, setError] = useState(""); // เก็บข้อความ error
    const [success, setSuccess] = useState(""); // เก็บข้อความ success
    const [loading, setLoading] = useState(false); // สถานะ Loading
    const router = useRouter(); // ใช้สำหรับ Redirect

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            loginSchema.parse({ email, password });

            const nextAuthResponse = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });
            console.log(email)

            if (nextAuthResponse?.error) {
                setError(nextAuthResponse.error);
            } else {
                setSuccess("Login successful!");
                // ✅ Redirect ไป "/dashboard" หลังจาก Login สำเร็จ
                router.push("/");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = () => {
        setIsLogin(!isLogin);
        setEmail("");
        setPassword("");
        setError("");
        setSuccess("");
    };

    return (
        <div className="hero min-h-screen" style={{ backgroundImage: "url(https://github.com/pmndrs/zustand/raw/main/docs/bear.jpg)" }}>
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md flex flex-col justify-center items-center w-96">
                    <h1 className="mb-5 text-5xl font-bold">{isLogin ? "Login" : "Register"}</h1>
                    <p className="mb-5">{isLogin ? "Login as ApiPokemon." : "Create an account to get started."}</p>
                    <div className="card bg-base-100 shadow-md shadow-accent shadow-lg shadow-accent w-full shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Email</label>
                                <input
                                    type="text"  // เปลี่ยนจาก email เป็น text เพราะเป็น email
                                    className="input w-full placeholder:text-success text-success border-[2px] border-accent "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className="fieldset-label">Password</label>
                                <input
                                    type="password"
                                    className="input w-full placeholder:text-success text-success border-[2px] border-accent "
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div>
                                    <a onClick={handleToggle} className="link link-hover text-accent">
                                        {isLogin ? "Don't have an account? Register here" : "Already have an account? Login"}
                                    </a>
                                </div>
                                <button
                                    className="btn btn-neutral mt-4"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : isLogin ? "Login" : "Register"}
                                </button>
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                                {success && <p className="text-green-500 mt-2">{success}</p>}
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
