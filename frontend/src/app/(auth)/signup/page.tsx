"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        full_name: "",
        college: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post("/auth/signup", formData);
            router.push("/login?signup=success");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Something went wrong");
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
                    <CardTitle className="text-2xl font-bold tracking-tight text-center">Create an account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your details to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <div className="text-destructive text-sm font-medium text-center">{error}</div>}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Full Name</label>
                            <Input required value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">College / University</label>
                            <Input required value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} placeholder="Stanford University" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Email</label>
                            <Input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="name@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Password</label>
                            <Input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••" />
                            <div className="text-xs text-muted-foreground space-y-1 mt-2 p-3 bg-muted/50 rounded-lg">
                                <p className="font-semibold mb-1">Password must contain:</p>
                                <ul className="list-disc pl-4 space-y-0.5">
                                    <li className={formData.password.length >= 6 ? "text-green-600" : ""}>At least 6 characters</li>
                                    <li className={/[A-Z]/.test(formData.password) ? "text-green-600" : ""}>One uppercase letter</li>
                                    <li className={/[a-z]/.test(formData.password) ? "text-green-600" : ""}>One lowercase letter</li>
                                    <li className={/\d/.test(formData.password) ? "text-green-600" : ""}>One number</li>
                                    <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? "text-green-600" : ""}>One special character</li>
                                </ul>
                            </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Creating account..." : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="text-center text-sm w-full text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="underline underline-offset-4 hover:text-primary font-medium">
                            Log in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
