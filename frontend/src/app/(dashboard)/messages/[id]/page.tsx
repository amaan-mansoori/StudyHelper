"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/lib/store";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Message {
    id: number;
    content: string;
    sender_id: number;
    timestamp: string;
}

export default function ChatPage() {
    const params = useParams();
    const userId = typeof params.id === 'string' ? parseInt(params.id) : 0;
    const { user } = useAuthStore();

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    const fetchMessages = async () => {
        try {
            const res = await api.get(`/messages/${userId}`);
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [userId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            await api.post("/messages/", {
                content: newMessage,
                receiver_id: userId,
                assignment_id: null
            });
            setNewMessage("");
            fetchMessages();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="mb-4 flex items-center gap-2">
                <Link href="/messages">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-xl font-bold">Chat</h1>
                <span className="text-sm text-muted-foreground ml-2">with User #{userId}</span>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-sm border-border/60">
                <div className="flex-1 overflow-auto p-4 space-y-4" ref={scrollRef}>
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                            <p>No messages yet.</p>
                            <p className="text-sm">Say hello!</p>
                        </div>
                    )}
                    {messages.map((msg) => {
                        const isMe = msg.sender_id === user?.id;
                        return (
                            <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                                <div className={cn(
                                    "max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                                    isMe
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-white dark:bg-gray-800 text-foreground border border-border/50 rounded-bl-none"
                                )}>
                                    <p>{msg.content}</p>
                                    <span className={cn(
                                        "text-[10px] block text-right mt-1",
                                        isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                                    )}>
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-4 bg-background/95 border-t border-border/50 backdrop-blur">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1 rounded-full px-4 border-border/60 focus-visible:ring-offset-0"
                            autoFocus
                        />
                        <Button type="submit" size="icon" className="rounded-full shadow-md hover:shadow-lg transition-all" disabled={!newMessage.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}
