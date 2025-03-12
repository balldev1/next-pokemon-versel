"use client";
import { useState, useEffect } from "react";

export const ButtonTheme = () => {

    const [theme, setTheme] = useState<string | null>(null); // เริ่มต้นเป็น null เพื่อหลีกเลี่ยง hydration error

    useEffect(() => {
        // โหลดธีมเริ่มต้นจาก localStorage หรือใช้ค่า default
        const savedTheme = localStorage.getItem("theme") || "garden";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        if (!theme) return; // ป้องกันการสลับธีมถ้ายังไม่ได้โหลดค่า

        const newTheme = theme === "abyss" ? "garden" : "abyss";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme); // บันทึกค่าไว้
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    if (!theme) return null; // ป้องกันการเรนเดอร์ก่อนที่ธีมจะถูกโหลด

    return (

        <div className="relative flex items-center justify-center ">
            <label className="toggle text-accent shadow-sm shadow-accent absolute  top-5  z-50">
                <input type="checkbox" className="" onChange={toggleTheme} checked={theme === "garden"}/>
                <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2"></path>
                        <path d="M12 20v2"></path>
                        <path d="m4.93 4.93 1.41 1.41"></path>
                        <path d="m17.66 17.66 1.41 1.41"></path>
                        <path d="M2 12h2"></path>
                        <path d="M20 12h2"></path>
                        <path d="m6.34 17.66-1.41 1.41"></path>
                        <path d="m19.07 4.93-1.41 1.41"></path>
                    </g>
                </svg>

                <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    </g>
                </svg>
            </label>
        </div>
    );
};
