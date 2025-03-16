// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from "@/lib/prismadb";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    // ตรวจสอบว่า email
    const existingUser = await prisma.users.findUnique({ where: { email } });

    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' });
    }

    // ตรวจสอบว่า username หรือ email ไม่เป็น null
    if (!email) {
        return NextResponse.json({ error: ' and email are required' });
    }

    // แฮชรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้ใหม่
    const user = await prisma.users.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    return NextResponse.json({ message: 'User registered successfully', user });
}
