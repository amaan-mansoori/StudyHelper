import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-6 lg:px-8 h-16 flex items-center border-b border-border/40 backdrop-blur-md sticky top-0 bg-background/80 z-50">
                <Link className="flex items-center justify-center font-bold text-xl tracking-tight" href="#">
                    StudyHelper
                </Link>
                <nav className="ml-auto flex gap-6 sm:gap-8">
                    <Link className="text-sm font-medium hover:text-primary transition-colors flex items-center" href="/login">
                        Log In
                    </Link>
                    <Link href="/signup">
                        <Button size="sm" className="rounded-full px-6">Get Started</Button>
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-24 md:py-32 lg:py-48 flex flex-col items-center justify-center text-center px-4 md:px-6 relative overflow-hidden">
                    {/* Minimal Soft Background */}
                    <div className="absolute inset-0 -z-10 h-full w-full bg-background">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-[128px] pointer-events-none" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full blur-[128px] pointer-events-none" />
                    </div>

                    <div className="space-y-6 max-w-4xl relative z-10">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-[#DADCE0] to-[#9FA1A6] animate-fade-in drop-shadow-sm">
                            Master Your Studies with <br />
                            <span className="text-[#0071E3]">Premium Resources</span>
                        </h1>
                        <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-2xl/relaxed dark:text-gray-400 animate-fade-in [animation-delay:200ms] opacity-0 fill-mode-forwards">
                            The all-in-one platform for sharing notes, getting assignment help, and connecting with top students from universities worldwide.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row justify-center pt-8 animate-fade-in [animation-delay:400ms] opacity-0 fill-mode-forwards">
                            <Link href="/signup">
                                <Button size="lg" className="rounded-full px-8 text-base h-12 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90">
                                    Start Learning Now
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="rounded-full px-8 text-base h-12 border-2 hover:bg-secondary/50">
                                    View Demo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="w-full py-24 bg-gray-50/50 dark:bg-gray-900/50 border-t border-border/50">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
                            <div className="space-y-4 p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">
                                    📚
                                </div>
                                <h3 className="text-xl font-bold">Share Notes</h3>
                                <p className="text-muted-foreground">Upload your class notes and help others while earning reputation points.</p>
                            </div>
                            <div className="space-y-4 p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xl">
                                    💡
                                </div>
                                <h3 className="text-xl font-bold">Assignment Help</h3>
                                <p className="text-muted-foreground">Post assignments you need help with or solve others' for rewards.</p>
                            </div>
                            <div className="space-y-4 p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xl">
                                    💬
                                </div>
                                <h3 className="text-xl font-bold">Real-time Chat</h3>
                                <p className="text-muted-foreground">Collaborate instantly with peers and helpers in a secure environment.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6 border-t border-border/40">
                <p className="text-xs text-muted-foreground">© 2024 StudyHelper Inc. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">Terms of Service</Link>
                    <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">Privacy</Link>
                </nav>
            </footer>
        </div>
    );
}
