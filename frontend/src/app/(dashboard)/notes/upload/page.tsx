"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { ArrowLeft, UploadCloud } from "lucide-react";
import Link from "next/link";

export default function UploadNotePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        file_url: "https://example.com/placeholder.pdf", // Mock file upload for simplicity
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/notes/", formData);
            router.push("/notes");
        } catch (err) {
            console.error(err);
            alert("Failed to upload note");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Link href="/notes" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Notes
            </Link>

            <Card className="border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle>Upload Study Note</CardTitle>
                    <CardDescription>Share your knowledge with the community.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="upload-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Introduction to Psychology" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description / Content</label>
                            <textarea
                                className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-sm focus:shadow-md"
                                required
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Brief summary of what this note contains..."
                            />
                        </div>

                        <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer group">
                            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <UploadCloud className="h-6 w-6 text-primary" />
                            </div>
                            <h4 className="font-semibold">Click to upload file</h4>
                            <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, or Images (Max 10MB)</p>
                            <p className="text-xs text-green-600 mt-2 font-medium">(Mock: File auto-attached)</p>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" form="upload-form" disabled={loading}>
                        {loading ? "Uploading..." : "Upload Note"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
