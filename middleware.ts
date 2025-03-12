import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    // ถ้าเป็นหน้า /login ไม่ต้องตรวจสอบ token
    if (pathname === "/login") {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        // ตรวจสอบความถูกต้องของ JWT (ถอดรหัส)
        jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.next();
    } catch (error) {
        console.error("Invalid Token:", error);
        // ถ้า JWT ไม่ถูกต้อง Redirect ไปหน้า Login
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

// ระบุเส้นทางที่ต้องใช้ middleware
export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
