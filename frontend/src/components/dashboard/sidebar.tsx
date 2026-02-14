"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BookOpen, GraduationCap, MessageSquare, User, LogOut } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const sidebarItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/notes", label: "Study Notes", icon: BookOpen },
    { href: "/assignments", label: "Assignments", icon: GraduationCap },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
    const pathname = usePathname();
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login"); // or /
    };

    return (
        <aside className="hidden w-64 flex-col border-r border-border/40 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-xl lg:flex h-screen sticky top-0">
            <div className="p-6">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    StudyHelper
                </Link>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-white dark:bg-gray-800 text-primary shadow-sm"
                                    : "text-muted-foreground hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-foreground"
                            )}
                        >
                            <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-border/40">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Log out
                </button>
            </div>
        </aside>
    );
}
