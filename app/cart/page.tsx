'use client'
import {useSession} from "next-auth/react";

const CartPage = () => {
    const {data: session, status} = useSession();

    if (status === "loading") {
        return <div className="min-h-screen flex items-center justify-center ">
            <span className="loading loading-spinner text-warning h-20 w-20"></span>
        </div>
    }

    return (
        <div className="p-5">
            <div className="container mx-auto p-5 rounded-md shadow-sm shadow-accent border-accent">
                <h1>CartPage</h1>
                {session ? (
                    <div>
                        <h2>Welcome, {session.user?.name || "User"}!</h2>
                        <p>Email: {session.user?.email}</p>
                        <pre>{JSON.stringify(session, null, 2)}</pre>
                    </div>
                ) : (
                    <p>Please log in to view your cart.</p>
                )}
            </div>
        </div>
    );
};

export default CartPage;
