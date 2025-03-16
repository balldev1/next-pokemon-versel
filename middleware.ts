// import { NextResponse } from 'next/server';
//
// export async function middleware(req: any) {
//     // ดึง JWT จาก cookies
//     const jwt = req.cookies.get('next-auth.session-token');
//
//     // หากไม่มี JWT ให้ redirect ไปที่หน้า login
//     if (!jwt) {
//         return NextResponse.redirect(new URL('/login', req.url));
//     }
//
//     // ดำเนินการปกติ ถ้ามี JWT
//     return NextResponse.next();
// }
//
// // กำหนด path ที่ต้องการให้ middleware ทำงาน
// export const config = {
//     matcher: ['/cart', '/'], // middleware จะทำงานเฉพาะกับเส้นทางเหล่านี้
// };
