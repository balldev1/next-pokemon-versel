import { connectDB } from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await connectDB();

    const { username, password } = await req.json();

    if (!username || !password) {
        return new Response(JSON.stringify({ message: "All fields required" }), { status: 400 });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
}
