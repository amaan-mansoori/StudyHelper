"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PostAssignmentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/assignments/", formData);
            router.push("/assignments");
        } catch (err) {
            console.error(err);
            alert("Failed to post assignment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Link href="/assignments" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assignments
            </Link>

            <Card className="border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle>Post New Assignment</CardTitle>
                    <CardDescription>Get help from top students.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="post-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Assignment Title</label>
                            <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Solve Linear Algebra Problem Set 3" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Detailed Description</label>
                            <textarea
                                className="flex min-h-[150px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-sm focus:shadow-md"
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe the requirements, improved deadline, etc."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Budget (₹)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground font-bold">₹</span>
                                <Input
                                    type="number"
                                    className="pl-9"
                                    required
                                    min="0"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) })}
                                    placeholder="500"
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" form="post-form" disabled={loading}>
                        {loading ? "Posting..." : "Post Assignment"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
