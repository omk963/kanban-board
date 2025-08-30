"use client";

import { useState } from "react";
import { useSignUpEmailPassword } from "@nhost/nextjs";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const { signUpEmailPassword, isLoading, error } = useSignUpEmailPassword();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        await signUpEmailPassword(email, password);

        if (!error) {
            // Redirect after successful registration
            router.push("/boards");
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={handleRegister} className="space-y-4">
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
                    className="w-full p-2 bg-green-500 text-white rounded"
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>
                {error && <p className="text-red-500">{error.message}</p>}
            </form>
            <p className="mt-4 text-sm">
                Already have an account? <a href="/login" className="text-blue-500">Login</a>
            </p>
        </div>
    );
}
