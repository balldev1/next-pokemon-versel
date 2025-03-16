// app/components/ClientLayout.tsx
"use client";  // ทำให้เป็น Client Component

import { SessionProvider } from "next-auth/react";  // นำเข้า SessionProvider

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}  {/* ห่อ children ด้วย SessionProvider */}
        </SessionProvider>
    );
}
