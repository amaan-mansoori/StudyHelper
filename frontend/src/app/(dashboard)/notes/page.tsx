"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Note {
    id: number;
    title: string;
    content: string;
    file_url: string;
    owner_id: number;
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/notes/")
            .then((res) => setNotes(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Study Notes</h1>
                    <p className="text-muted-foreground">Browse and share detailed study materials.</p>
                </div>
                <Link href="/notes/upload">
                    <Button className="shadow-lg hover:shadow-xl transition-all"><Plus className="mr-2 h-4 w-4" /> Upload Note</Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    <p className="text-muted-foreground col-span-full text-center py-10">Loading notes...</p>
                ) : notes.length === 0 ? (
                    <Card className="col-span-full border-dashed p-10 flex flex-col items-center justify-center text-center">
                        <p className="text-muted-foreground mb-4">No notes found. Upload your first note!</p>
                        <Link href="/notes/upload">
                            <Button variant="outline">Upload Now</Button>
                        </Link>
                    </Card>
                ) : (
                    notes.map((note) => (
                        <Card key={note.id} className="h-full flex flex-col hover:shadow-md transition-all group">
                            <CardHeader>
                                <CardTitle className="group-hover:text-primary transition-colors">{note.title}</CardTitle>
                                <CardDescription className="line-clamp-2">{note.content}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                {/* Preview or details */}
                            </CardContent>
                            <CardFooter>
                                <Button variant="secondary" size="sm" className="w-full">Download</Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
