import { connectDB } from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    await connectDB();

    const { username, password } = await req.json();

    const user = await User.findOne({ username });
    if (!user) {
        return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return new Response(JSON.stringify({ message: "Login successful" }), {
        status: 200,
        headers: {
            // สำหรับ Local Development (localhost)
            "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`,
            // สำหรับ Production (HTTPS)
            // "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=86400; Secure; SameSite=Lax`,
        },
    });
}
