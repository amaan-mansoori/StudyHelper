"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, PenTool, MessageCircle, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { href: "/notes", label: "Notes", icon: BookOpen },
        { href: "/assignments", label: "Assignments", icon: PenTool },
        { href: "/messages", label: "Chat", icon: MessageCircle },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center max-w-7xl mx-auto px-4">
                <div className="mr-8 flex md:flex-row flex-col">
                    <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">NoteGenie</span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search can go here */}
                    </div>
                    <div className="flex items-center space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                <span className="hidden sm:inline-block">{item.label}</span>
                            </Link>
                        ))}
                        <Link href="/login">
                            <Button variant="default" size="sm">Login</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
