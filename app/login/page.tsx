"use client";

import { useState } from "react";
import { useSignInEmailPassword } from "@nhost/nextjs";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { signInEmailPassword, isLoading, error } = useSignInEmailPassword();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        await signInEmailPassword(email, password);

        if (!error) {
            // Redirect after successful login
            router.push("/boards");
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full p-2 bg-blue-500 text-white rounded"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
                {error && <p className="text-red-500">{error.message}</p>}
            </form>
            <p className="mt-4 text-sm">
                Don’t have an account? <a href="/register" className="text-blue-500">Register</a>
            </p>
        </div>
    );
}
