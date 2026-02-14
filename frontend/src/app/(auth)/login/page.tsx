"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("username", email);
            formData.append("password", password);

            const res = await api.post("/auth/login/access-token", formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            const { access_token } = res.data;

            // 1. Store token immediately so interceptor picks it up
            login(null, access_token);

            // 2. Set default header explicitly for immediate use (redundant with interceptor but requested)
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

            // 3. Fetch user - interceptor will attach token
            const userRes = await api.get("/users/me");

            // 4. Update store with user details
            login(userRes.data, access_token);

            router.push("/dashboard");
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.response?.data?.detail || "Invalid credentials. Please try again.");
            // If failed after setting token, clear it
            useAuthStore.getState().logout();
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="border-border/5 bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-center">Welcome back</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to sign in to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <div className="text-destructive text-sm font-medium text-center">{error}</div>}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                                <Link href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
                            </div>
                            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading} variant="default">
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="text-center text-sm w-full text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/signup" className="underline underline-offset-4 hover:text-primary font-medium">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
