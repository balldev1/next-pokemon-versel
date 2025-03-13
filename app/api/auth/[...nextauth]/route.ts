import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        // credential คือกำหนด ฟิลด์ ให้ผู้ใช้กรอก
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // ตรวจสอบว่าcredentialsผู้ใช้กรอกมามีอยู่และรหัสผ่านถูกต้องหรือไม่
                if (!credentials) return null;
                const user: any = await prisma.users.findUnique({
                    where: { email: credentials.email },
                });

                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    return {
                        // ข้อมูลใน mongodb ที่จะส่งไปเก็บไว้ที่ jwt
                        id: user.id,
                        email: user.email,
                    };
                } else {
                    // หากข้อมูลไม่ถูกต้องส่ง error กลับไป
                    throw new Error('Unauthorized');
                }
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    // expire
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 1 วัน (24 ชั่วโมง) ในหน่วยวินาที
    },
    jwt: {
        maxAge: 24 * 60 * 60, // 1 วัน (24 ชั่วโมง) ในหน่วยวินาที
    },
    // ดึงข้อมูล user จากฐานข้อมูล ค่าไว้ที่ cookie next-auth.session-token
    callbacks: {
        async jwt({ token, user }) {
            if (user ) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
            }
            return session;
        },
    }as any,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };