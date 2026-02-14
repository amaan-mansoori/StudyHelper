"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, MessageSquare } from "lucide-react";

export default function MessagesPage() {
    // Mock users for demo purposes since we don't have a robust "friend" system yet
    // In a real app, this would be fetched from /users or /conversations
    const users = [
        { id: 1, name: "Admin User", college: "System Helper" },
        { id: 2, name: "Jane Doe", college: "Harvard University" },
        { id: 3, name: "John Smith", college: "MIT" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
                <p className="text-muted-foreground">Collaborate on assignments and notes.</p>
            </div>

            <div className="grid gap-4">
                {users.map((u) => (
                    <Link key={u.id} href={`/messages/${u.id}`}>
                        <Card className="p-4 flex items-center justify-between hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    <User className="h-5 w-5 text-gray-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold group-hover:text-primary transition-colors">{u.name}</h3>
                                    <p className="text-sm text-muted-foreground">{u.college}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon">
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="text-center text-sm text-muted-foreground mt-8 p-8 border border-dashed rounded-xl">
                Select a user above to start chatting. <br />
                (In a real production app, this list would populate dynamically based on assignment interactions).
            </div>
        </div>
    );
}
