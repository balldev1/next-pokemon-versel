// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({

    pages: {
        signIn: '/login',  // กำหนดให้ redirect ไปที่หน้า login หากไม่มี session
    },
});
