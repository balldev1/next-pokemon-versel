import { NextResponse } from 'next/server';

export function middleware(req: Request) {
    // ดึงค่า cookies จาก headers
    const cookieHeader = req.headers.get('cookie');
    const cookies = new Map(cookieHeader?.split(';').map(cookie => cookie.trim().split('=')) || []);
    // ตรวจสอบว่า _vercel_jwt มีอยู่ใน cookies หรือไม่
    const vercelJwt = cookies.get('_vercel_jwt');
    console.log(vercelJwt)
    // ถ้าไม่มี _vercel_jwt และไม่ได้อยู่ในหน้า /login ให้ redirect ไปที่หน้า login
    if (!vercelJwt && req.url.includes('/login') === false) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // ถ้ามี _vercel_jwt หรืออยู่ในหน้า /login ให้ดำเนินการต่อไป
    return NextResponse.next();
}

// กำหนดให้ middleware ทำงานกับทุกเส้นทาง ยกเว้น /login
export const config = {
    matcher: ['/login'],
};
